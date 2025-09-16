const fs = require("fs");
const path = require("path");
const https = require("https");

const MODELS_DIR = path.join(__dirname, "models");
const BASE_URL =
  "https://github.com/justadudewhohacks/face-api.js/raw/master/weights";

// Ensure models directory exists
if (!fs.existsSync(MODELS_DIR)) {
  fs.mkdirSync(MODELS_DIR, { recursive: true });
  console.log("Created models directory");
}

// List of models to download
const models = [
  // SSD Mobilenet
  "ssd_mobilenetv1_model-weights_manifest.json",
  "ssd_mobilenetv1_model-shard1",
  "ssd_mobilenetv1_model-shard2",

  // Tiny Face Detector
  "tiny_face_detector_model-weights_manifest.json",
  "tiny_face_detector_model-shard1",

  // Face Landmark Detection
  "face_landmark_68_model-weights_manifest.json",
  "face_landmark_68_model-shard1",

  // Face Recognition
  "face_recognition_model-weights_manifest.json",
  "face_recognition_model-shard1",
  "face_recognition_model-shard2",

  // Face Expression
  "face_expression_model-weights_manifest.json",
  "face_expression_model-shard1",
];

// Download a file
const downloadFile = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);

    https
      .get(url, (response) => {
        if (response.statusCode === 200) {
          response.pipe(file);
          file.on("finish", () => {
            file.close();
            resolve();
          });
        } else {
          fs.unlink(dest, () => {}); // Delete the file if download failed
          reject(
            `Failed to download ${url}, status code: ${response.statusCode}`
          );
        }
      })
      .on("error", (err) => {
        fs.unlink(dest, () => {}); // Delete the file if download failed
        reject(err.message);
      });
  });
};

// Download all models
const downloadModels = async () => {
  console.log("Starting to download models...");

  for (const model of models) {
    const url = `${BASE_URL}/${model}`;
    const dest = path.join(MODELS_DIR, model);

    // Skip if file already exists
    if (fs.existsSync(dest)) {
      console.log(`${model} already exists, skipping`);
      continue;
    }

    console.log(`Downloading ${model}...`);
    try {
      await downloadFile(url, dest);
      console.log(`Successfully downloaded ${model}`);
    } catch (error) {
      console.error(`Error downloading ${model}: ${error}`);
    }
  }

  console.log("Model download completed");
};

downloadModels();
