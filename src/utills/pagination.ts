export const getPagination = (query: any) => {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Number(query.limit) || 10, 100);
  const skip = (page - 1) * limit;

  const sortBy = query.sortBy || "createdAt";
  const sortOrder = query.sortOrder === "asc" ? "asc" : "desc";
    const search = query.search || "";
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
    search
  };
};