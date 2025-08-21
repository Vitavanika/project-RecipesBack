import createError from "http-errors";
import { Recipe } from "../models/recipe";

const parseBool = (v) => (typeof v === "string" ? v.toLowerCase() === "true" : !!v);

export const getMyRecipes = async (req, res, next) => {
  try {
    const {
      page = "1",
      perPage = "10",
      sortBy = "createdAt",
      sortOrder = "desc",
      q,
      tags,
      isFavorite,
      fields,
    } = req.query;

    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(perPage, 10) || 10, 1), 100);
    const skip = (pageNum - 1) * limit;

    // Базовий фільтр — лише свої
    const filter = { owner: req.user.id };

    // Пошук
    if (q && q.trim()) {
      // Якщо є текстовий індекс — зручніше $text
      // filter.$text = { $search: q.trim() };
      // Якщо без $text, то по title/description:
      filter.$or = [
        { title: { $regex: q.trim(), $options: "i" } },
        { description: { $regex: q.trim(), $options: "i" } },
      ];
    }

    // Фільтр по тегах (усі з переліку)
    if (tags) {
      const list = tags.split(",").map((t) => t.trim()).filter(Boolean);
      if (list.length) filter.tags = { $all: list };
    }

    // Обране
    if (typeof isFavorite !== "undefined") {
      filter.isFavorite = parseBool(isFavorite);
    }

    // Сортування
    const direction = sortOrder.toLowerCase() === "asc" ? 1 : -1;
    const sort = { [sortBy]: direction };

    // Проєкція полів
    const projection = {};
    if (fields) {
      fields
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean)
        .forEach((f) => (projection[f] = 1));
      // обов'язково додаємо _id
      projection._id = 1;
    }

    const [items, total] = await Promise.all([
      Recipe.find(filter, projection).sort(sort).skip(skip).limit(limit).lean(),
      Recipe.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    return res.status(200).json({
      status: 200,
      message: "My recipes fetched",
      data: {
        recipes: items,
        page: pageNum,
        perPage: limit,
        total,
        totalPages,
      },
    });
  } catch (err) {
    next(createError(err.status || 500, err.message || "Failed to fetch recipes"));
  }
};