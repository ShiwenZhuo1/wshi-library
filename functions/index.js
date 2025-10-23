// v2 imports
const { setGlobalOptions } = require("firebase-functions/v2/options");
const { onRequest } = require("firebase-functions/v2/https");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");

admin.initializeApp();

// 统一全局设置（例如最大并发容器数）
setGlobalOptions({ maxInstances: 10 });

/**
 * GET /countBooks  -> { count: number }
 * v2 的 onRequest 内置 CORS 支持：{ cors: true }
 */
exports.countBooks = onRequest({ cors: true }, async (req, res) => {
  try {
    const snap = await admin.firestore().collection("books").get();
    res.status(200).json({ count: snap.size });
  } catch (err) {
    console.error("Error counting books:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * GET /getAllBooks -> [ { id, ...fields }, ... ]
 */
exports.getAllBooks = onRequest({ cors: true }, async (req, res) => {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }
    const snap = await admin.firestore().collection("books").get();
    const books = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    res.status(200).json(books);
  } catch (err) {
    console.error("Error fetching all books:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

exports.capitalizeBookData = onDocumentCreated("books/{bookId}", async (event) => {
  const snap = event.data;                 // DocumentSnapshot
  if (!snap) return;

  const data = snap.data() || {};
  const uppercased = {};
  for (const [k, v] of Object.entries(data)) {
    uppercased[k] = typeof v === "string" ? v.toUpperCase() : v;
  }


  const changed = Object.keys(uppercased).some((k) => uppercased[k] !== data[k]);
  if (changed) {
    await snap.ref.update(uppercased);
  }
});
