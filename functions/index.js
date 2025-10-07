/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functionsV1 = require("firebase-functions");              // v1 Firestore 触发器
const { setGlobalOptions } = require("firebase-functions");
const { onRequest } = require("firebase-functions/https");
const admin = require("firebase-admin");
const cros = require("cors")({ origin: true }); // CORS enabled

admin.initializeApp();
const logger = require("firebase-functions/logger");

// setGlobalOptions doesn't apply to v1 functions, kept for consistency with your file.
setGlobalOptions({ maxInstances: 10 });

// GET /countBooks  -> { count: <number> }
exports.countBooks = onRequest((req, res) => {
  cros(req, res, async () => {
    try {
      const booksSnapshot = await admin.firestore().collection("books").get();
      const bookCount = booksSnapshot.size;
      res.status(200).json({ count: bookCount });
    } catch (error) {
      console.error("Error counting books: ", error);
      res.status(500).send("Internal Server Error");
    }
  });
});

// GET /getAllBooks -> [ { id, ...fields }, ... ]
exports.getAllBooks = onRequest((req, res) => {
  cros(req, res, async () => {
    try {
      if (req.method !== "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
      }

      const snapshot = await admin.firestore().collection("books").get();
      const books = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      res.status(200).json(books);
    } catch (error) {
      console.error("Error fetching all books: ", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
});

/**
 * Firestore onCreate trigger:
 * When a new document is added to 'books', capitalise all string fields.
 */
exports.capitalizeBookData = functionsV1.firestore
  .document("books/{bookId}")
  .onCreate(async (snap, context) => {
    const data = snap.data() || {};
    const uppercased = {};

    // 转大写：仅对 string 字段；数字（如 isbn）保持不变
    for (const [key, value] of Object.entries(data)) {
      uppercased[key] = typeof value === "string" ? value.toUpperCase() : value;
    }

    // 仅当确实有变化时再写回，避免无意义更新
    const needsUpdate = Object.keys(uppercased).some(
      (k) => uppercased[k] !== data[k]
    );
    if (needsUpdate) {
      await snap.ref.update(uppercased);
    }

    return null;
  });
