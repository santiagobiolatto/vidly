const request = require("supertest");
const { Genre } = require("../../models/genre");

let server;

describe("/api/genres", () => {
  beforeAll(async () => {
    server = require("../../index");
  });
  beforeEach(async () => {
    await Genre.collection.insertMany([
      { name: "genre1" },
      { name: "genre2" },
      { name: "genre3" },
    ]);
  });
  afterEach(async () => {
    await Genre.remove({});
  });
  afterAll(() => {
    server.close();
  });
  describe("GET /", () => {
    it("should return all genres", async () => {
      const res = await request(server).get("/api/genres");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(3);
      expect(res.body.some((g) => g.name === "genre1")).toBeTruthy();
      expect(res.body.some((g) => g.name === "genre2")).toBeTruthy();
      expect(res.body.some((g) => g.name === "genre3")).toBeTruthy();
    });
    it("should return the genre with the given id", async () => {
      const genre = new Genre({ name: "genreX" });
      await genre.save();

      const res = await request(server).get("/api/genres/" + genre._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", genre.name);
      expect(res.body.name).toBe("genreX");
    });
    it("should return 404 if invalid id is passed", async () => {
      const res = await request(server).get("/api/genres/1");
      expect(res.status).toBe(404);
    });
  });
  describe("POST /", () => {
    it("should return 401 if client is not logged in", async () => {
      const res = await request(server)
        .post("/api/genres")
        .send({ name: "genre1" });
      expect(res.status).toBe(401);
    });
  });
});
