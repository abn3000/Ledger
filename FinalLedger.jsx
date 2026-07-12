import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Leaf, Sprout, Flower2, TreeDeciduous, Droplet, Sun, AlertTriangle,
  CheckCircle2, Camera, Plus, X, Trash2, Search, Bell, ChevronRight,
  Loader2, Upload, MapPin, Clock, Sparkles, Image as ImageIcon, Calendar
} from "lucide-react";

/* ---------------------------------------------------------------------- */
/* Plant database                                                          */
/* ---------------------------------------------------------------------- */

const LIGHT_LEVELS = ["low", "medium", "bright-indirect", "direct"];
const LIGHT_LABELS = {
  low: "Low light",
  medium: "Medium light",
  "bright-indirect": "Bright indirect light",
  direct: "Direct sun",
};

const PLANT_DB = [
  { id: "snake-plant", commonName: "Snake Plant", sciName: "Dracaena trifasciata", light: "low", waterDays: 18, petSafe: false, difficulty: "easy", icon: "Sprout" },
  { id: "pothos", commonName: "Pothos", sciName: "Epipremnum aureum", light: "medium", waterDays: 8, petSafe: false, difficulty: "easy", icon: "Leaf" },
  { id: "monstera", commonName: "Monstera Deliciosa", sciName: "Monstera deliciosa", light: "bright-indirect", waterDays: 8, petSafe: false, difficulty: "moderate", icon: "Leaf" },
  { id: "zz-plant", commonName: "ZZ Plant", sciName: "Zamioculcas zamiifolia", light: "low", waterDays: 18, petSafe: false, difficulty: "easy", icon: "Sprout" },
  { id: "peace-lily", commonName: "Peace Lily", sciName: "Spathiphyllum spp.", light: "medium", waterDays: 6, petSafe: false, difficulty: "moderate", icon: "Flower2" },
  { id: "spider-plant", commonName: "Spider Plant", sciName: "Chlorophytum comosum", light: "medium", waterDays: 7, petSafe: true, difficulty: "easy", icon: "Leaf" },
  { id: "fiddle-leaf-fig", commonName: "Fiddle Leaf Fig", sciName: "Ficus lyrata", light: "bright-indirect", waterDays: 8, petSafe: false, difficulty: "hard", icon: "TreeDeciduous" },
  { id: "aloe-vera", commonName: "Aloe Vera", sciName: "Aloe vera", light: "direct", waterDays: 18, petSafe: false, difficulty: "easy", icon: "Sun" },
  { id: "rubber-plant", commonName: "Rubber Plant", sciName: "Ficus elastica", light: "bright-indirect", waterDays: 8, petSafe: false, difficulty: "easy", icon: "TreeDeciduous" },
  { id: "boston-fern", commonName: "Boston Fern", sciName: "Nephrolepis exaltata", light: "medium", waterDays: 4, petSafe: true, difficulty: "moderate", icon: "Sprout" },
  { id: "philodendron", commonName: "Heartleaf Philodendron", sciName: "Philodendron hederaceum", light: "medium", waterDays: 7, petSafe: false, difficulty: "easy", icon: "Leaf" },
  { id: "english-ivy", commonName: "English Ivy", sciName: "Hedera helix", light: "medium", waterDays: 7, petSafe: false, difficulty: "moderate", icon: "Leaf" },
  { id: "echeveria", commonName: "Echeveria (Succulent)", sciName: "Echeveria spp.", light: "direct", waterDays: 14, petSafe: true, difficulty: "easy", icon: "Sun" },
  { id: "orchid", commonName: "Phalaenopsis Orchid", sciName: "Phalaenopsis spp.", light: "bright-indirect", waterDays: 7, petSafe: true, difficulty: "moderate", icon: "Flower2" },
  { id: "jade-plant", commonName: "Jade Plant", sciName: "Crassula ovata", light: "direct", waterDays: 18, petSafe: false, difficulty: "easy", icon: "Sun" },
  { id: "calathea", commonName: "Calathea", sciName: "Calathea orbifolia", light: "medium", waterDays: 6, petSafe: true, difficulty: "hard", icon: "Sprout" },
  { id: "chinese-evergreen", commonName: "Chinese Evergreen", sciName: "Aglaonema spp.", light: "low", waterDays: 8, petSafe: false, difficulty: "easy", icon: "Leaf" },
  { id: "dracaena-marginata", commonName: "Dracaena Marginata", sciName: "Dracaena marginata", light: "medium", waterDays: 12, petSafe: false, difficulty: "easy", icon: "TreeDeciduous" },
  { id: "african-violet", commonName: "African Violet", sciName: "Saintpaulia ionantha", light: "bright-indirect", waterDays: 7, petSafe: true, difficulty: "moderate", icon: "Flower2" },
  { id: "birds-nest-fern", commonName: "Bird's Nest Fern", sciName: "Asplenium nidus", light: "medium", waterDays: 6, petSafe: true, difficulty: "moderate", icon: "Sprout" },

  // -- More houseplants --
  { id: "money-tree", commonName: "Money Tree", sciName: "Pachira aquatica", light: "bright-indirect", waterDays: 8, petSafe: true, difficulty: "easy", icon: "TreeDeciduous" },
  { id: "areca-palm", commonName: "Areca Palm", sciName: "Dypsis lutescens", light: "bright-indirect", waterDays: 6, petSafe: true, difficulty: "moderate", icon: "TreeDeciduous" },
  { id: "parlor-palm", commonName: "Parlor Palm", sciName: "Chamaedorea elegans", light: "low", waterDays: 8, petSafe: true, difficulty: "easy", icon: "TreeDeciduous" },
  { id: "ponytail-palm", commonName: "Ponytail Palm", sciName: "Beaucarnea recurvata", light: "direct", waterDays: 20, petSafe: true, difficulty: "easy", icon: "Sun" },
  { id: "croton", commonName: "Croton", sciName: "Codiaeum variegatum", light: "bright-indirect", waterDays: 6, petSafe: false, difficulty: "moderate", icon: "Leaf" },
  { id: "dieffenbachia", commonName: "Dieffenbachia", sciName: "Dieffenbachia seguine", light: "medium", waterDays: 7, petSafe: false, difficulty: "moderate", icon: "Leaf" },
  { id: "anthurium", commonName: "Anthurium", sciName: "Anthurium andraeanum", light: "bright-indirect", waterDays: 7, petSafe: false, difficulty: "moderate", icon: "Flower2" },
  { id: "bromeliad", commonName: "Bromeliad", sciName: "Bromeliaceae spp.", light: "bright-indirect", waterDays: 10, petSafe: true, difficulty: "easy", icon: "Flower2" },
  { id: "air-plant", commonName: "Air Plant", sciName: "Tillandsia spp.", light: "bright-indirect", waterDays: 7, petSafe: true, difficulty: "easy", icon: "Sprout" },
  { id: "prayer-plant", commonName: "Prayer Plant", sciName: "Maranta leuconeura", light: "medium", waterDays: 6, petSafe: true, difficulty: "moderate", icon: "Sprout" },
  { id: "string-of-pearls", commonName: "String of Pearls", sciName: "Senecio rowleyanus", light: "bright-indirect", waterDays: 12, petSafe: false, difficulty: "moderate", icon: "Sun" },
  { id: "string-of-hearts", commonName: "String of Hearts", sciName: "Ceropegia woodii", light: "bright-indirect", waterDays: 12, petSafe: true, difficulty: "easy", icon: "Leaf" },
  { id: "christmas-cactus", commonName: "Christmas Cactus", sciName: "Schlumbergera bridgesii", light: "medium", waterDays: 10, petSafe: true, difficulty: "easy", icon: "Sun" },
  { id: "cast-iron-plant", commonName: "Cast Iron Plant", sciName: "Aspidistra elatior", light: "low", waterDays: 12, petSafe: true, difficulty: "easy", icon: "Leaf" },
  { id: "peperomia", commonName: "Peperomia", sciName: "Peperomia obtusifolia", light: "medium", waterDays: 9, petSafe: true, difficulty: "easy", icon: "Leaf" },
  { id: "swiss-cheese-vine", commonName: "Swiss Cheese Vine", sciName: "Monstera adansonii", light: "bright-indirect", waterDays: 7, petSafe: false, difficulty: "moderate", icon: "Leaf" },
  { id: "yucca-cane", commonName: "Yucca Cane", sciName: "Yucca elephantipes", light: "direct", waterDays: 14, petSafe: false, difficulty: "easy", icon: "Sun" },
  { id: "weeping-fig", commonName: "Weeping Fig", sciName: "Ficus benjamina", light: "bright-indirect", waterDays: 7, petSafe: false, difficulty: "moderate", icon: "TreeDeciduous" },
  { id: "kentia-palm", commonName: "Kentia Palm", sciName: "Howea forsteriana", light: "medium", waterDays: 8, petSafe: true, difficulty: "moderate", icon: "TreeDeciduous" },
  { id: "bamboo-palm", commonName: "Bamboo Palm", sciName: "Chamaedorea seifrizii", light: "medium", waterDays: 7, petSafe: true, difficulty: "easy", icon: "TreeDeciduous" },
  { id: "norfolk-pine", commonName: "Norfolk Island Pine", sciName: "Araucaria heterophylla", light: "bright-indirect", waterDays: 7, petSafe: true, difficulty: "moderate", icon: "TreeDeciduous" },
  { id: "umbrella-tree", commonName: "Umbrella Tree", sciName: "Schefflera arboricola", light: "bright-indirect", waterDays: 8, petSafe: false, difficulty: "easy", icon: "TreeDeciduous" },
  { id: "wandering-jew", commonName: "Wandering Jew", sciName: "Tradescantia zebrina", light: "medium", waterDays: 6, petSafe: false, difficulty: "easy", icon: "Leaf" },
  { id: "rex-begonia", commonName: "Rex Begonia", sciName: "Begonia rex", light: "medium", waterDays: 6, petSafe: false, difficulty: "moderate", icon: "Flower2" },
  { id: "bird-of-paradise", commonName: "Bird of Paradise", sciName: "Strelitzia reginae", light: "bright-indirect", waterDays: 7, petSafe: false, difficulty: "moderate", icon: "TreeDeciduous" },
  { id: "alocasia", commonName: "Alocasia (Elephant Ear)", sciName: "Alocasia amazonica", light: "bright-indirect", waterDays: 6, petSafe: false, difficulty: "hard", icon: "Leaf" },
  { id: "hoya", commonName: "Hoya (Wax Plant)", sciName: "Hoya carnosa", light: "bright-indirect", waterDays: 10, petSafe: true, difficulty: "easy", icon: "Leaf" },
  { id: "lucky-bamboo", commonName: "Lucky Bamboo", sciName: "Dracaena sanderiana", light: "medium", waterDays: 7, petSafe: false, difficulty: "easy", icon: "Sprout" },
  { id: "venus-flytrap", commonName: "Venus Flytrap", sciName: "Dionaea muscipula", light: "bright-indirect", waterDays: 5, petSafe: true, difficulty: "hard", icon: "Sprout" },
  { id: "barrel-cactus", commonName: "Barrel Cactus", sciName: "Echinocactus grusonii", light: "direct", waterDays: 21, petSafe: true, difficulty: "easy", icon: "Sun" },
  { id: "poinsettia", commonName: "Poinsettia", sciName: "Euphorbia pulcherrima", light: "bright-indirect", waterDays: 7, petSafe: false, difficulty: "moderate", icon: "Flower2" },
  { id: "cyclamen", commonName: "Cyclamen", sciName: "Cyclamen persicum", light: "bright-indirect", waterDays: 6, petSafe: false, difficulty: "moderate", icon: "Flower2" },
  { id: "kalanchoe", commonName: "Kalanchoe", sciName: "Kalanchoe blossfeldiana", light: "direct", waterDays: 12, petSafe: false, difficulty: "easy", icon: "Flower2" },
  { id: "haworthia", commonName: "Haworthia", sciName: "Haworthia fasciata", light: "bright-indirect", waterDays: 16, petSafe: true, difficulty: "easy", icon: "Sun" },
  { id: "chinese-money-plant", commonName: "Chinese Money Plant", sciName: "Pilea peperomioides", light: "medium", waterDays: 7, petSafe: true, difficulty: "easy", icon: "Leaf" },

  // -- Backyard & garden plants --
  { id: "rose-bush", commonName: "Rose Bush", sciName: "Rosa spp.", light: "direct", waterDays: 3, petSafe: true, difficulty: "moderate", icon: "Flower2" },
  { id: "hydrangea", commonName: "Hydrangea", sciName: "Hydrangea macrophylla", light: "bright-indirect", waterDays: 3, petSafe: false, difficulty: "moderate", icon: "Flower2" },
  { id: "hibiscus", commonName: "Hibiscus", sciName: "Hibiscus rosa-sinensis", light: "direct", waterDays: 4, petSafe: true, difficulty: "moderate", icon: "Flower2" },
  { id: "lavender", commonName: "Lavender", sciName: "Lavandula angustifolia", light: "direct", waterDays: 10, petSafe: false, difficulty: "easy", icon: "Flower2" },
  { id: "boxwood", commonName: "Boxwood", sciName: "Buxus sempervirens", light: "direct", waterDays: 7, petSafe: false, difficulty: "easy", icon: "TreeDeciduous" },
  { id: "hosta", commonName: "Hosta", sciName: "Hosta spp.", light: "medium", waterDays: 4, petSafe: false, difficulty: "easy", icon: "Leaf" },
  { id: "daylily", commonName: "Daylily", sciName: "Hemerocallis spp.", light: "direct", waterDays: 4, petSafe: false, difficulty: "easy", icon: "Flower2" },
  { id: "tulip", commonName: "Tulip", sciName: "Tulipa spp.", light: "direct", waterDays: 6, petSafe: false, difficulty: "easy", icon: "Flower2" },
  { id: "daffodil", commonName: "Daffodil", sciName: "Narcissus spp.", light: "direct", waterDays: 6, petSafe: false, difficulty: "easy", icon: "Flower2" },
  { id: "marigold", commonName: "Marigold", sciName: "Tagetes spp.", light: "direct", waterDays: 3, petSafe: true, difficulty: "easy", icon: "Flower2" },
  { id: "petunia", commonName: "Petunia", sciName: "Petunia spp.", light: "direct", waterDays: 2, petSafe: true, difficulty: "easy", icon: "Flower2" },
  { id: "geranium", commonName: "Geranium", sciName: "Pelargonium spp.", light: "direct", waterDays: 5, petSafe: false, difficulty: "easy", icon: "Flower2" },
  { id: "sunflower", commonName: "Sunflower", sciName: "Helianthus annuus", light: "direct", waterDays: 3, petSafe: true, difficulty: "easy", icon: "Flower2" },
  { id: "peony", commonName: "Peony", sciName: "Paeonia lactiflora", light: "direct", waterDays: 5, petSafe: false, difficulty: "moderate", icon: "Flower2" },
  { id: "azalea", commonName: "Azalea", sciName: "Rhododendron simsii", light: "bright-indirect", waterDays: 4, petSafe: false, difficulty: "moderate", icon: "Flower2" },
  { id: "japanese-maple", commonName: "Japanese Maple", sciName: "Acer palmatum", light: "bright-indirect", waterDays: 5, petSafe: true, difficulty: "moderate", icon: "TreeDeciduous" },
  { id: "lilac-bush", commonName: "Lilac Bush", sciName: "Syringa vulgaris", light: "direct", waterDays: 6, petSafe: true, difficulty: "easy", icon: "Flower2" },
  { id: "hyacinth", commonName: "Hyacinth", sciName: "Hyacinthus orientalis", light: "direct", waterDays: 5, petSafe: false, difficulty: "easy", icon: "Flower2" },
  { id: "coneflower", commonName: "Coneflower (Echinacea)", sciName: "Echinacea purpurea", light: "direct", waterDays: 5, petSafe: true, difficulty: "easy", icon: "Flower2" },
  { id: "wisteria", commonName: "Wisteria", sciName: "Wisteria sinensis", light: "direct", waterDays: 6, petSafe: false, difficulty: "hard", icon: "Leaf" },

  // -- Fruits --
  { id: "tomato-plant", commonName: "Tomato Plant", sciName: "Solanum lycopersicum", light: "direct", waterDays: 2, petSafe: false, difficulty: "moderate", icon: "Sprout" },
  { id: "strawberry-plant", commonName: "Strawberry Plant", sciName: "Fragaria x ananassa", light: "direct", waterDays: 3, petSafe: true, difficulty: "easy", icon: "Sprout" },
  { id: "blueberry-bush", commonName: "Blueberry Bush", sciName: "Vaccinium corymbosum", light: "direct", waterDays: 4, petSafe: true, difficulty: "moderate", icon: "TreeDeciduous" },
  { id: "raspberry-bush", commonName: "Raspberry Bush", sciName: "Rubus idaeus", light: "direct", waterDays: 4, petSafe: true, difficulty: "moderate", icon: "TreeDeciduous" },
  { id: "lemon-tree", commonName: "Lemon Tree", sciName: "Citrus limon", light: "direct", waterDays: 7, petSafe: false, difficulty: "moderate", icon: "TreeDeciduous" },
  { id: "lime-tree", commonName: "Lime Tree", sciName: "Citrus aurantiifolia", light: "direct", waterDays: 7, petSafe: false, difficulty: "moderate", icon: "TreeDeciduous" },
  { id: "orange-tree", commonName: "Orange Tree", sciName: "Citrus sinensis", light: "direct", waterDays: 7, petSafe: false, difficulty: "moderate", icon: "TreeDeciduous" },
  { id: "apple-tree", commonName: "Apple Tree", sciName: "Malus domestica", light: "direct", waterDays: 7, petSafe: false, difficulty: "moderate", icon: "TreeDeciduous" },
  { id: "fig-tree", commonName: "Fig Tree", sciName: "Ficus carica", light: "direct", waterDays: 6, petSafe: false, difficulty: "easy", icon: "TreeDeciduous" },
  { id: "grape-vine", commonName: "Grape Vine", sciName: "Vitis vinifera", light: "direct", waterDays: 6, petSafe: false, difficulty: "moderate", icon: "Leaf" },
  { id: "watermelon-plant", commonName: "Watermelon Plant", sciName: "Citrullus lanatus", light: "direct", waterDays: 3, petSafe: true, difficulty: "moderate", icon: "Sprout" },
  { id: "pineapple-plant", commonName: "Pineapple Plant", sciName: "Ananas comosus", light: "bright-indirect", waterDays: 12, petSafe: false, difficulty: "moderate", icon: "Sprout" },

  // -- Vegetables --
  { id: "pepper-plant", commonName: "Bell Pepper Plant", sciName: "Capsicum annuum", light: "direct", waterDays: 3, petSafe: false, difficulty: "easy", icon: "Sprout" },
  { id: "cucumber-plant", commonName: "Cucumber Plant", sciName: "Cucumis sativus", light: "direct", waterDays: 2, petSafe: true, difficulty: "easy", icon: "Sprout" },
  { id: "zucchini-plant", commonName: "Zucchini Plant", sciName: "Cucurbita pepo", light: "direct", waterDays: 2, petSafe: true, difficulty: "easy", icon: "Sprout" },
  { id: "pumpkin-plant", commonName: "Pumpkin Plant", sciName: "Cucurbita pepo", light: "direct", waterDays: 3, petSafe: true, difficulty: "moderate", icon: "Sprout" },
  { id: "carrot", commonName: "Carrot", sciName: "Daucus carota", light: "direct", waterDays: 4, petSafe: true, difficulty: "easy", icon: "Sprout" },
  { id: "lettuce", commonName: "Lettuce", sciName: "Lactuca sativa", light: "bright-indirect", waterDays: 2, petSafe: true, difficulty: "easy", icon: "Sprout" },
  { id: "spinach", commonName: "Spinach", sciName: "Spinacia oleracea", light: "bright-indirect", waterDays: 3, petSafe: true, difficulty: "easy", icon: "Sprout" },
  { id: "kale", commonName: "Kale", sciName: "Brassica oleracea", light: "direct", waterDays: 4, petSafe: true, difficulty: "easy", icon: "Sprout" },
  { id: "onion", commonName: "Onion", sciName: "Allium cepa", light: "direct", waterDays: 5, petSafe: false, difficulty: "easy", icon: "Sprout" },
  { id: "garlic", commonName: "Garlic", sciName: "Allium sativum", light: "direct", waterDays: 6, petSafe: false, difficulty: "easy", icon: "Sprout" },
  { id: "potato-plant", commonName: "Potato Plant", sciName: "Solanum tuberosum", light: "direct", waterDays: 5, petSafe: false, difficulty: "easy", icon: "Sprout" },
  { id: "peas", commonName: "Peas", sciName: "Pisum sativum", light: "direct", waterDays: 3, petSafe: true, difficulty: "easy", icon: "Sprout" },
  { id: "green-beans", commonName: "Green Beans", sciName: "Phaseolus vulgaris", light: "direct", waterDays: 3, petSafe: true, difficulty: "easy", icon: "Sprout" },
];

const ICONS = { Leaf, Sprout, Flower2, TreeDeciduous, Sun };
const PlantIcon = ({ name, ...props }) => {
  const C = ICONS[name] || Leaf;
  return <C {...props} />;
};

/* ---------------------------------------------------------------------- */
/* Helpers                                                                  */
/* ---------------------------------------------------------------------- */

const DAY_MS = 86400000;
const todayStr = () => new Date().toISOString().slice(0, 10);
const formatDisplayDate = (isoDate) => {
  const [y, m, d] = isoDate.split("-").map(Number);
  if (!y || !m || !d) return isoDate;
  return new Date(y, m - 1, d).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
};
const daysBetween = (a, b) => Math.floor((new Date(b) - new Date(a)) / DAY_MS);
const titleCase = (str) => (str || "").replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1));

// Capitalizes just the first letter of a sentence/phrase (leaves the rest as-is)
// and makes sure it ends with punctuation — used for the freeform text the AI
// health check returns (summary, issues, actions) so it reads cleanly no matter
// how the model happened to capitalize it.
const sentenceCase = (str) => {
  if (!str) return str;
  const trimmed = str.trim();
  if (!trimmed) return trimmed;
  const capitalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  return /[.!?]$/.test(capitalized) ? capitalized : `${capitalized}.`;
};

function wateringInfo(plant) {
  const since = daysBetween(plant.lastWatered, todayStr());
  const until = plant.waterDays - since;
  let status = "ok";
  if (until <= 0) status = "overdue";
  else if (until <= 1) status = "soon";
  return { since, until, status };
}

function getRecommendedWaterDays(plant) {
  if (plant.recommendedWaterDays) return plant.recommendedWaterDays;
  const dbEntry = PLANT_DB.find((p) => p.id === plant.speciesId);
  return dbEntry ? dbEntry.waterDays : plant.waterDays;
}

function waterDeviation(plant) {
  const recommended = getRecommendedWaterDays(plant);
  const current = plant.waterDays;
  if (!recommended || !current) return null;
  const ratio = current / recommended;
  if (ratio <= 0.5) {
    return {
      level: "bad",
      msg: `That's much more often than typical (usually every ${recommended}d) — watering this frequently risks waterlogged roots and rot.`,
    };
  }
  if (ratio >= 2) {
    return {
      level: "bad",
      msg: `That's much less often than typical (usually every ${recommended}d) — the plant may dry out and get stressed between waterings.`,
    };
  }
  if (ratio <= 0.8 || ratio >= 1.25) {
    return {
      level: "workable",
      msg: `A bit off the usual pace of every ${recommended}d for this plant — keep an eye on how it responds.`,
    };
  }
  return { level: "ok", msg: `Right in line with the usual every ${recommended}d for this plant.` };
}

function matchLight(plantLight, spotLight) {
  const pIdx = LIGHT_LEVELS.indexOf(plantLight);
  const sIdx = LIGHT_LEVELS.indexOf(spotLight);
  const diff = sIdx - pIdx;
  if (diff === 0) return { level: "ideal", msg: "Ideal light match" };
  if (diff === 1) return { level: "workable", msg: "A touch brighter than ideal — watch for scorch on leaf edges" };
  if (diff === -1) return { level: "workable", msg: "A touch dimmer than ideal — growth may slow a bit" };
  if (diff >= 2) return { level: "poor", msg: "Too much light for this plant — consider a shadier spot" };
  return { level: "poor", msg: "Not enough light for this plant — consider a brighter spot" };
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result.split(",")[1]);
    r.onerror = () => reject(new Error("Could not read file"));
    r.readAsDataURL(file);
  });
}

function fileToCompressedDataUrl(file, maxDim = 900, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new window.Image();
      img.onload = () => {
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = () => reject(new Error("Could not read image"));
      img.src = reader.result;
    };
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.readAsDataURL(file);
  });
}

async function analyzePlantHealth(plant, base64, mediaType) {
  const prompt = `You are a plant health expert. This photo shows a ${plant.commonName} (${plant.sciName}), nicknamed "${plant.nickname}". Its usual care needs: ${LIGHT_LABELS[plant.light]}, watering roughly every ${plant.waterDays} days. Look closely at leaf color, spotting, wilting, growth pattern and soil if visible. Respond with ONLY valid JSON and nothing else (no markdown fences, no preamble), in exactly this shape:
{"status":"healthy" | "minor issues" | "needs attention" | "critical","issues":["short issue phrase", "..."],"actions":["short immediate action phrase", "..."],"summary":"one sentence summary"}`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: [
            { type: "image", source: { type: "base64", media_type: mediaType, data: base64 } },
            { type: "text", text: prompt },
          ],
        },
      ],
    }),
  });
  const data = await response.json();
  const textBlock = (data.content || []).find((c) => c.type === "text");
  if (!textBlock) throw new Error("No response from analysis");
  const cleaned = textBlock.text.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
}

async function identifyPlantFromPhoto(base64, mediaType) {
  const catalog = PLANT_DB.map((p) => `${p.id} — ${p.commonName} (${p.sciName})`).join("\n");
  const prompt = `You are a houseplant and garden-plant identification expert. Look closely at this photo — leaf shape, size, arrangement, color, pattern, stem, and any visible growth habit — and decide which entry in the catalog below it most likely is. Only choose from this exact catalog (each line is "id — common name (scientific name)"):
${catalog}

Respond with ONLY valid JSON and nothing else (no markdown fences, no preamble), in exactly this shape:
{"matchId":"<id from the catalog above, or null if nothing in the catalog is a confident match>","confidence":"low" | "medium" | "high","reasoning":"one sentence explanation of the key visual traits that led to this identification","alternateIds":["<id>", "..."]}
Include up to 2 alternateIds only if there are other plausible catalog matches worth considering. Use null for matchId only when you truly cannot narrow it to anything in the catalog.`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 700,
      messages: [
        {
          role: "user",
          content: [
            { type: "image", source: { type: "base64", media_type: mediaType, data: base64 } },
            { type: "text", text: prompt },
          ],
        },
      ],
    }),
  });
  const data = await response.json();
  const textBlock = (data.content || []).find((c) => c.type === "text");
  if (!textBlock) throw new Error("No response from analysis");
  const cleaned = textBlock.text.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
}

async function analyzeLightLevel(base64, mediaType) {
  const prompt = `You are a houseplant lighting expert. This photo shows a spot in someone's home or backyard where they are considering placing a plant. Judge the brightness and quality of the natural light reaching this spot — consider window proximity and direction, whether direct sun rays or shadows are visible, how washed-out or dim the space looks, and time-of-day cues. Classify it into exactly one of these four categories:
- "low": far from windows, dim, mostly artificial light or deep shade
- "medium": some natural light but no direct sun, moderately bright
- "bright-indirect": close to a window with lots of natural light but no direct sun rays hitting the spot
- "direct": direct sun rays visibly hitting the spot for at least part of the day
Respond with ONLY valid JSON and nothing else (no markdown fences, no preamble), in exactly this shape:
{"light":"low" | "medium" | "bright-indirect" | "direct","confidence":"low" | "medium" | "high","reasoning":"one sentence explanation"}`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 500,
      messages: [
        {
          role: "user",
          content: [
            { type: "image", source: { type: "base64", media_type: mediaType, data: base64 } },
            { type: "text", text: prompt },
          ],
        },
      ],
    }),
  });
  const data2 = await response.json();
  const textBlock2 = (data2.content || []).find((c) => c.type === "text");
  if (!textBlock2) throw new Error("No response from analysis");
  const cleaned2 = textBlock2.text.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned2);
}

/* ---------------------------------------------------------------------- */
/* Storage                                                                  */
/* ---------------------------------------------------------------------- */

async function loadGarden() {
  try {
    const res = await window.storage.get("garden-data", false);
    if (res && res.value) {
      const parsed = JSON.parse(res.value);
      return { plants: [], spots: [], photos: [], ...parsed };
    }
  } catch (e) {
    /* key not found yet, first run */
  }
  return { plants: [], spots: [], photos: [] };
}

async function saveGarden(garden) {
  try {
    await window.storage.set("garden-data", JSON.stringify(garden), false);
  } catch (e) {
    console.error("Save failed", e);
  }
}

/* ---------------------------------------------------------------------- */
/* Style block                                                             */
/* ---------------------------------------------------------------------- */

const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,500;0,600;1,500&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

    .garden-app {
      --ink: #1F3025;
      --ink-soft: #2A3D2E;
      --paper: #F4EAD0;
      --paper-dim: #E9DCB8;
      --brass: #C9A227;
      --rust: #A8552E;
      --sage: #7C9473;
      --moss: #3F5B3F;
      --text-dark: #2B2417;
      --text-light: #F1ECDD;
      --ok: #4B6B4E;
      --warn: #C9A227;
      --bad: #A8552E;
      font-family: 'Inter', sans-serif;
      background: var(--ink);
      color: var(--text-light);
      min-height: 100%;
      width: 100%;
      box-sizing: border-box;
    }
    .garden-app * { box-sizing: border-box; }
    .garden-app .display { font-family: 'Fraunces', serif; }
    .garden-app .sci { font-family: 'Fraunces', serif; font-style: italic; opacity: 0.75; }
    .garden-app .mono { font-family: 'IBM Plex Mono', monospace; }

    .garden-shell {
      display: flex;
      min-height: 100vh;
      background: var(--ink);
    }
    .garden-nav {
      width: 200px;
      flex-shrink: 0;
      padding: 28px 14px;
      border-right: 1px solid rgba(241,236,221,0.12);
    }
    .garden-nav-title {
      font-size: 20px;
      letter-spacing: 0.02em;
      padding: 0 10px 24px 10px;
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--brass);
    }
    .nav-tab {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      background: none;
      border: none;
      color: var(--text-light);
      opacity: 0.7;
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      padding: 11px 10px;
      border-radius: 3px;
      cursor: pointer;
      text-align: left;
      position: relative;
      transition: opacity 0.15s ease, background 0.15s ease;
    }
    .nav-tab:hover { opacity: 0.95; background: rgba(241,236,221,0.06); }
    .nav-tab.active {
      opacity: 1;
      background: rgba(201,162,39,0.12);
      color: var(--brass);
    }
    .nav-tab.active::before {
      content: '';
      position: absolute;
      left: -14px;
      top: 6px;
      bottom: 6px;
      width: 3px;
      background: var(--brass);
      border-radius: 2px;
    }
    .nav-badge {
      margin-left: auto;
      background: var(--rust);
      color: var(--text-light);
      font-size: 11px;
      font-family: 'IBM Plex Mono', monospace;
      padding: 1px 6px;
      border-radius: 10px;
    }

    .garden-main {
      flex: 1;
      min-width: 0;
      padding: 32px clamp(24px, 3.5vw, 56px) 60px clamp(24px, 3.5vw, 56px);
      max-width: 1400px;
      width: 100%;
    }
    .page-eyebrow {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 11px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--sage);
      margin-bottom: 6px;
    }
    .page-title {
      font-size: 30px;
      color: var(--text-light);
      margin: 0 0 24px 0;
    }

    /* specimen card */
    .card {
      background: var(--paper);
      color: var(--text-dark);
      border-radius: 4px;
      position: relative;
      box-shadow: 0 6px 18px rgba(0,0,0,0.25);
    }
    .card::before {
      content: '';
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--brass);
      box-shadow: 0 1px 2px rgba(0,0,0,0.4);
    }
    .specimen {
      padding: 22px 18px 18px 18px;
      cursor: pointer;
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .specimen:hover { transform: translateY(-3px); box-shadow: 0 10px 22px rgba(0,0,0,0.3); }
    .specimen-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 10px;
      margin-bottom: 10px;
    }
    .specimen-name { font-size: 17px; margin: 0; line-height: 1.2; }
    .specimen-sci { font-size: 12.5px; margin: 2px 0 0 0; }
    .tag {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      font-family: 'IBM Plex Mono', monospace;
      padding: 2px 7px;
      border-radius: 10px;
      background: rgba(63,91,63,0.12);
      color: var(--moss);
      border: 1px solid rgba(63,91,63,0.25);
    }
    .tag.warn { background: rgba(201,162,39,0.15); color: #8a6d10; border-color: rgba(201,162,39,0.35); }
    .tag.bad { background: rgba(168,85,46,0.14); color: var(--rust); border-color: rgba(168,85,46,0.35); }

    .dotted-row {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 12px;
      font-size: 12px;
    }
    .dotted-line {
      flex: 1;
      border-bottom: 1px dotted rgba(43,36,23,0.35);
      height: 1px;
      margin: 0 4px;
    }

    .btn {
      font-family: 'Inter', sans-serif;
      font-size: 13px;
      font-weight: 600;
      border: none;
      border-radius: 3px;
      padding: 9px 16px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      transition: filter 0.15s ease, transform 0.1s ease;
    }
    .btn:active { transform: scale(0.98); }
    .btn-brass { background: var(--brass); color: #2B2417; }
    .btn-brass:hover { filter: brightness(1.08); }
    .btn-moss { background: var(--moss); color: var(--text-light); }
    .btn-moss:hover { filter: brightness(1.15); }
    .btn-ghost { background: transparent; color: var(--text-dark); border: 1px solid rgba(43,36,23,0.3); }
    .btn-ghost:hover { background: rgba(43,36,23,0.06); }
    .btn-danger { background: transparent; color: var(--rust); border: 1px solid rgba(168,85,46,0.4); }
    .btn-danger:hover { background: rgba(168,85,46,0.08); }
    .btn:disabled { opacity: 0.5; cursor: not-allowed; }

    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 18px; }

    .field-label {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--moss);
      display: block;
      margin-bottom: 5px;
    }
    .input, .select {
      width: 100%;
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      padding: 9px 11px;
      border-radius: 3px;
      border: 1px solid rgba(43,36,23,0.25);
      background: #fff;
      color: var(--text-dark);
    }
    .input:focus, .select:focus, .btn:focus-visible, .nav-tab:focus-visible {
      outline: 2px solid var(--brass);
      outline-offset: 1px;
    }

    .banner {
      background: var(--ink-soft);
      border: 1px solid rgba(241,236,221,0.15);
      border-radius: 4px;
      padding: 16px 20px;
      margin-bottom: 22px;
      box-shadow: 0 4px 14px rgba(0,0,0,0.2);
    }
    .task-row {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 9px 0;
      border-bottom: 1px solid rgba(241,236,221,0.08);
      font-size: 13.5px;
    }
    .task-row:last-child { border-bottom: none; }

    .modal-backdrop {
      position: fixed; inset: 0; background: rgba(15,20,15,0.6);
      display: flex; align-items: center; justify-content: center;
      z-index: 50; padding: 24px;
    }
    .modal {
      background: var(--paper);
      color: var(--text-dark);
      border-radius: 6px;
      max-width: 560px;
      width: 100%;
      max-height: 88vh;
      overflow-y: auto;
      padding: 26px 26px 22px 26px;
      position: relative;
    }
    .modal-close {
      position: absolute; top: 16px; right: 16px;
      background: none; border: none; cursor: pointer; color: var(--text-dark); opacity: 0.6;
    }
    .modal-close:hover { opacity: 1; }

    .gauge-wrap { display: flex; align-items: center; gap: 16px; }
    .health-badge {
      display: inline-flex; align-items: center; gap: 6px;
      font-size: 12.5px; font-weight: 600; padding: 4px 10px; border-radius: 12px;
    }
    .health-healthy { background: rgba(75,107,78,0.15); color: var(--ok); }
    .health-minor { background: rgba(201,162,39,0.18); color: #8a6d10; }
    .health-attention { background: rgba(168,85,46,0.16); color: var(--rust); }
    .health-critical { background: rgba(168,85,46,0.28); color: #7a2f16; }

    .empty-state {
      text-align: center; padding: 60px 20px; color: rgba(241,236,221,0.55);
    }

    .spot-card {
      padding: 16px 18px;
    }
    .plant-in-spot {
      display: flex; align-items: center; justify-content: space-between;
      padding: 7px 0; font-size: 13px; border-top: 1px dashed rgba(43,36,23,0.2);
    }

    input[type=file] { font-size: 12.5px; }

    .polaroid-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 34px 24px;
      padding-top: 6px;
    }
    .polaroid {
      --r: -2deg;
      background: #fdfcf8;
      padding: 12px 12px 44px 12px;
      border-radius: 2px;
      box-shadow: 0 10px 22px rgba(0,0,0,0.35), 0 2px 4px rgba(0,0,0,0.15);
      transform: rotate(var(--r));
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      position: relative;
    }
    .polaroid:hover {
      transform: rotate(0deg) scale(1.03);
      box-shadow: 0 16px 30px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.15);
      z-index: 2;
    }
    .polaroid::before {
      content: '';
      position: absolute;
      top: -10px;
      left: 50%;
      transform: translateX(-50%) rotate(-3deg);
      width: 46px;
      height: 18px;
      background: rgba(201,162,39,0.55);
      border: 1px solid rgba(201,162,39,0.7);
      box-shadow: 0 2px 3px rgba(0,0,0,0.2);
    }
    .polaroid img {
      display: block;
      width: 100%;
      height: 170px;
      object-fit: cover;
      background: #e5e0cf;
      filter: saturate(0.95) contrast(1.02);
    }
    .polaroid-caption {
      padding-top: 10px;
      text-align: center;
    }
    .polaroid-name {
      font-family: 'Fraunces', serif;
      font-style: italic;
      font-size: 15px;
      color: var(--text-dark);
      line-height: 1.2;
    }
    .polaroid-note {
      font-size: 11.5px;
      color: rgba(43,36,23,0.65);
      margin-top: 3px;
    }
    .polaroid-date {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      font-size: 10.5px;
      color: rgba(43,36,23,0.55);
      margin-top: 5px;
    }
    .polaroid-delete {
      position: absolute;
      top: 8px;
      right: 8px;
      background: rgba(255,255,255,0.85);
      border: 1px solid rgba(43,36,23,0.2);
      color: var(--text-dark);
      border-radius: 50%;
      width: 22px;
      height: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.15s ease;
    }
    .polaroid:hover .polaroid-delete { opacity: 1; }

    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

    @media (max-width: 720px) {
      .garden-shell { flex-direction: column; }
      .garden-nav { width: 100%; display: flex; padding: 14px; gap: 4px; border-right: none; border-bottom: 1px solid rgba(241,236,221,0.12); overflow-x: auto; }
      .nav-tab.active::before { display: none; }
      .garden-main { padding: 22px; }
    }
  `}</style>
);

/* ---------------------------------------------------------------------- */
/* Watering gauge (signature element)                                      */
/* ---------------------------------------------------------------------- */

function WaterGauge({ plant, size = 64 }) {
  const { since, until, status } = wateringInfo(plant);
  const frac = Math.min(Math.max(since / plant.waterDays, 0), 1);
  const r = (size - 8) / 2;
  const c = 2 * Math.PI * r;
  const color = status === "overdue" ? "var(--bad)" : status === "soon" ? "var(--warn)" : "var(--ok)";

  let top, bottom;
  if (status === "overdue") {
    top = `${Math.abs(until)}d`;
    bottom = "overdue";
  } else if (until === 0) {
    top = "today";
    bottom = "";
  } else {
    top = `in ${until}d`;
    bottom = "";
  }

  const topSize = Math.max(9, Math.round(size * 0.19));
  const bottomSize = Math.max(8, Math.round(size * 0.15));
  const pad = Math.max(3, Math.round(size * 0.14));

  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(43,36,23,0.15)" strokeWidth="5" />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="5"
          strokeDasharray={c} strokeDashoffset={c * (1 - frac)} strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div
        className="mono"
        style={{
          position: "absolute", inset: pad, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", textAlign: "center",
          lineHeight: 1.15, overflow: "hidden",
        }}
      >
        <span style={{ fontSize: topSize, fontWeight: 600, whiteSpace: "nowrap" }}>{top}</span>
        {bottom && <span style={{ fontSize: bottomSize, opacity: 0.85 }}>{bottom}</span>}
      </div>
    </div>
  );
}

function WaterDeviationNote({ plant }) {
  const dev = waterDeviation(plant);
  if (!dev || dev.level === "ok") {
    return (
      <p style={{ fontSize: 12, opacity: 0.65, margin: "6px 0 0 0", display: "flex", alignItems: "center", gap: 5 }}>
        <CheckCircle2 size={12} /> {dev ? dev.msg : ""}
      </p>
    );
  }
  return (
    <p style={{ fontSize: 12, margin: "6px 0 0 0", display: "flex", alignItems: "flex-start", gap: 5, color: dev.level === "bad" ? "var(--rust)" : "#8a6d10" }}>
      <AlertTriangle size={12} style={{ marginTop: 1, flexShrink: 0 }} /> {dev.msg}
    </p>
  );
}

/* ---------------------------------------------------------------------- */
/* Specimen card                                                           */
/* ---------------------------------------------------------------------- */

function SpecimenCard({ plant, spot, onOpen, onWater }) {
  const { status } = wateringInfo(plant);
  const health = plant.lastHealthStatus;
  return (
    <div className="card specimen" onClick={() => onOpen(plant.id)}>
      <div className="specimen-header">
        <div>
          <p className="display specimen-name">{plant.nickname}</p>
          <p className="sci specimen-sci">{plant.sciName}</p>
        </div>
        <PlantIcon name={plant.icon} size={20} color="var(--moss)" />
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 4 }}>
        <span className="tag"><MapPin size={11} />{spot ? spot.name : "No spot set"}</span>
        {health && (
          <span className={`tag ${health === "healthy" ? "" : health === "minor issues" ? "warn" : "bad"}`}>
            {health === "healthy" ? <CheckCircle2 size={11} /> : <AlertTriangle size={11} />} {titleCase(health)}
          </span>
        )}
      </div>
      <div className="dotted-row">
        <WaterGauge plant={plant} size={58} />
        <span className="dotted-line" />
        <button
          className="btn btn-ghost"
          style={{ padding: "6px 10px", fontSize: 12 }}
          onClick={(e) => { e.stopPropagation(); onWater(plant.id); }}
        >
          <Droplet size={13} /> Mark watered
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Main App                                                                 */
/* ---------------------------------------------------------------------- */

export default function App() {
  const [garden, setGarden] = useState({ plants: [], spots: [] });
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("dashboard");
  const [openPlantId, setOpenPlantId] = useState(null);
  const [notifPermission, setNotifPermission] = useState(
    typeof Notification !== "undefined" ? Notification.permission : "unsupported"
  );
  const notified = useRef(false);

  useEffect(() => {
    loadGarden().then((g) => { setGarden(g); setLoading(false); });
  }, []);

  const persist = useCallback((next) => {
    setGarden(next);
    saveGarden(next);
  }, []);

  const addPlant = (plant) => persist({ ...garden, plants: [...garden.plants, plant] });
  const updatePlant = (id, patch) =>
    persist({ ...garden, plants: garden.plants.map((p) => (p.id === id ? { ...p, ...patch } : p)) });
  const deletePlant = (id) => {
    persist({ ...garden, plants: garden.plants.filter((p) => p.id !== id) });
    if (openPlantId === id) setOpenPlantId(null);
  };
  const markWatered = (id) => updatePlant(id, { lastWatered: todayStr() });
  const addSpot = (spot) => persist({ ...garden, spots: [...garden.spots, spot] });
  const deleteSpot = (id) =>
    persist({
      ...garden,
      spots: garden.spots.filter((s) => s.id !== id),
      plants: garden.plants.map((p) => (p.spotId === id ? { ...p, spotId: null, spotApproval: null } : p)),
    });
  const addPhoto = (photo) => persist({ ...garden, photos: [photo, ...(garden.photos || [])] });
  const deletePhoto = (id) => persist({ ...garden, photos: (garden.photos || []).filter((ph) => ph.id !== id) });

  const overdue = garden.plants.filter((p) => wateringInfo(p).status === "overdue");
  const soon = garden.plants.filter((p) => wateringInfo(p).status === "soon");
  const needsAttention = garden.plants.filter(
    (p) => p.lastHealthStatus === "needs attention" || p.lastHealthStatus === "critical"
  );
  const poorSpots = garden.plants.filter((p) => {
    if (!p.spotId) return false;
    const spot = garden.spots.find((s) => s.id === p.spotId);
    return spot && matchLight(p.light, spot.light).level === "poor";
  });
  const offSchedule = garden.plants.filter((p) => {
    const dev = waterDeviation(p);
    return dev && dev.level === "bad";
  });

  useEffect(() => {
    if (loading || notified.current) return;
    if (notifPermission === "granted" && (overdue.length > 0 || needsAttention.length > 0)) {
      notified.current = true;
      try {
        new Notification("Plant care check-in", {
          body: `${overdue.length} plant(s) need water, ${needsAttention.length} need attention.`,
        });
      } catch (e) { /* ignore */ }
    }
  }, [loading, notifPermission, overdue.length, needsAttention.length]);

  const requestNotif = async () => {
    if (typeof Notification === "undefined") return;
    const perm = await Notification.requestPermission();
    setNotifPermission(perm);
  };

  const openPlant = garden.plants.find((p) => p.id === openPlantId);

  if (loading) {
    return (
      <div className="garden-app" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 300 }}>
        <Loader2 className="mono" size={22} style={{ animation: "spin 1s linear infinite" }} />
        <span style={{ marginLeft: 10 }}>Loading your garden…</span>
      </div>
    );
  }

  return (
    <div className="garden-app">
      <Styles />
      <div className="garden-shell">
        <nav className="garden-nav">
          <div className="garden-nav-title display"><Leaf size={20} /> Ledger</div>
          {[
            { id: "dashboard", label: "Dashboard", icon: Sun, badge: overdue.length + needsAttention.length + offSchedule.length },
            { id: "collection", label: "My Plants", icon: Leaf, badge: 0 },
            { id: "add", label: "Add Specimen", icon: Plus, badge: 0 },
            { id: "spots", label: "Light Map", icon: MapPin, badge: poorSpots.length },
            { id: "photobook", label: "Photobook", icon: ImageIcon, badge: 0 },
          ].map((t) => (
            <button key={t.id} className={`nav-tab ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
              <t.icon size={16} /> {t.label}
              {t.badge > 0 && <span className="nav-badge">{t.badge}</span>}
            </button>
          ))}
        </nav>

        <main className="garden-main">
          {tab === "dashboard" && (
            <DashboardTab
              garden={garden}
              overdue={overdue}
              soon={soon}
              needsAttention={needsAttention}
              poorSpots={poorSpots}
              offSchedule={offSchedule}
              notifPermission={notifPermission}
              requestNotif={requestNotif}
              onOpen={setOpenPlantId}
              onWater={markWatered}
            />
          )}
          {tab === "collection" && (
            <CollectionTab garden={garden} onOpen={setOpenPlantId} onWater={markWatered} onGoAdd={() => setTab("add")} />
          )}
          {tab === "add" && <AddTab garden={garden} onAdd={addPlant} onDone={() => setTab("collection")} />}
          {tab === "spots" && <SpotsTab garden={garden} onAddSpot={addSpot} onDeleteSpot={deleteSpot} onUpdatePlant={updatePlant} />}
          {tab === "photobook" && <PhotobookTab garden={garden} onAddPhoto={addPhoto} onDeletePhoto={deletePhoto} onGoAdd={() => setTab("add")} />}
        </main>
      </div>

      {openPlant && (
        <PlantModal
          plant={openPlant}
          spot={garden.spots.find((s) => s.id === openPlant.spotId)}
          spots={garden.spots}
          onClose={() => setOpenPlantId(null)}
          onUpdate={(patch) => updatePlant(openPlant.id, patch)}
          onWater={() => markWatered(openPlant.id)}
          onDelete={() => deletePlant(openPlant.id)}
        />
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Dashboard                                                                */
/* ---------------------------------------------------------------------- */

function DashboardTab({ garden, overdue, soon, needsAttention, poorSpots, offSchedule, notifPermission, requestNotif, onOpen, onWater }) {
  const total = garden.plants.length;
  return (
    <div>
      <p className="page-eyebrow">Today · {new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}</p>
      <h1 className="display page-title">The Garden, at a glance</h1>

      <div className="banner">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <strong style={{ fontSize: 14 }}>Today's tasks</strong>
          {notifPermission !== "granted" && notifPermission !== "unsupported" && (
            <button className="btn btn-brass" style={{ padding: "6px 12px", fontSize: 12 }} onClick={requestNotif}>
              <Bell size={13} /> Enable reminders
            </button>
          )}
        </div>
        {overdue.length === 0 && soon.length === 0 && needsAttention.length === 0 && poorSpots.length === 0 && offSchedule.length === 0 ? (
          <p style={{ fontSize: 13, opacity: 0.7, margin: 0 }}>Nothing urgent — every plant is on schedule.</p>
        ) : (
          <>
            {offSchedule.map((p) => (
              <div className="task-row" key={p.id}>
                <AlertTriangle size={14} color="var(--bad)" />
                <span style={{ flex: 1 }}>
                  <strong>{p.nickname}</strong>'s watering interval ({p.waterDays}d) is far from the usual {getRecommendedWaterDays(p)}d for this plant
                </span>
                <button className="btn btn-ghost" style={{ padding: "5px 10px", fontSize: 12, background: "rgba(241,236,221,0.9)" }} onClick={() => onOpen(p.id)}>Review</button>
              </div>
            ))}
            {overdue.map((p) => (
              <div className="task-row" key={p.id}>
                <Droplet size={14} color="var(--bad)" />
                <span style={{ flex: 1 }}><strong>{p.nickname}</strong> is overdue for water</span>
                <button className="btn btn-ghost" style={{ padding: "5px 10px", fontSize: 12, background: "rgba(241,236,221,0.9)" }} onClick={() => onWater(p.id)}>Water now</button>
              </div>
            ))}
            {soon.map((p) => (
              <div className="task-row" key={p.id}>
                <Clock size={14} color="var(--warn)" />
                <span style={{ flex: 1 }}><strong>{p.nickname}</strong> needs water within a day</span>
              </div>
            ))}
            {needsAttention.map((p) => (
              <div className="task-row" key={p.id}>
                <AlertTriangle size={14} color="var(--bad)" />
                <span style={{ flex: 1 }}>Last photo check flagged <strong>{p.nickname}</strong> — {titleCase(p.lastHealthStatus)}</span>
                <button className="btn btn-ghost" style={{ padding: "5px 10px", fontSize: 12, background: "rgba(241,236,221,0.9)" }} onClick={() => onOpen(p.id)}>Review</button>
              </div>
            ))}
            {poorSpots.map((p) => (
              <div className="task-row" key={p.id}>
                <Sun size={14} color="var(--warn)" />
                <span style={{ flex: 1 }}><strong>{p.nickname}</strong>'s spot is a poor light match</span>
                <button className="btn btn-ghost" style={{ padding: "5px 10px", fontSize: 12, background: "rgba(241,236,221,0.9)" }} onClick={() => onOpen(p.id)}>Review</button>
              </div>
            ))}
          </>
        )}
        {notifPermission === "granted" && (
          <p className="mono" style={{ fontSize: 11, opacity: 0.55, marginTop: 10, marginBottom: 0 }}>
            Browser reminders are on — they'll fire while this tab is open.
          </p>
        )}
      </div>

      <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
        <StatBlock label="Plants in collection" value={total} />
        <StatBlock label="Overdue for water" value={overdue.length} accent="var(--bad)" />
        <StatBlock label="Flagged by AI check" value={needsAttention.length} accent="var(--warn)" />
      </div>

      {total === 0 ? (
        <div className="empty-state">
          <Leaf size={28} style={{ marginBottom: 10, opacity: 0.5 }} />
          <p>Your ledger is empty. Add your first plant to start tracking it.</p>
        </div>
      ) : (
        <div className="grid">
          {garden.plants
            .slice()
            .sort((a, b) => wateringInfo(a).until - wateringInfo(b).until)
            .map((p) => (
              <SpecimenCard key={p.id} plant={p} spot={garden.spots.find((s) => s.id === p.spotId)} onOpen={onOpen} onWater={onWater} />
            ))}
        </div>
      )}
    </div>
  );
}

function StatBlock({ label, value, accent }) {
  return (
    <div className="card" style={{ flex: 1, padding: "16px 18px" }}>
      <div className="mono" style={{ fontSize: 26, fontWeight: 600, color: accent || "var(--ink-soft)" }}>{value}</div>
      <div style={{ fontSize: 12.5, opacity: 0.65, marginTop: 2 }}>{label}</div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Collection                                                               */
/* ---------------------------------------------------------------------- */

function CollectionTab({ garden, onOpen, onWater, onGoAdd }) {
  const [query, setQuery] = useState("");
  const filtered = garden.plants.filter((p) =>
    (p.nickname + p.commonName).toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div>
      <p className="page-eyebrow">Collection</p>
      <h1 className="display page-title">Your plants</h1>
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <div style={{ position: "relative", flex: 1, maxWidth: 320 }}>
          <Search size={15} style={{ position: "absolute", left: 10, top: 10, opacity: 0.6 }} />
          <input className="input" style={{ paddingLeft: 32 }} placeholder="Search your plants…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <button className="btn btn-brass" onClick={onGoAdd}><Plus size={15} /> Add specimen</button>
      </div>
      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>{garden.plants.length === 0 ? "No plants yet — add your first one." : "No plants match that search."}</p>
        </div>
      ) : (
        <div className="grid">
          {filtered.map((p) => (
            <SpecimenCard key={p.id} plant={p} spot={garden.spots.find((s) => s.id === p.spotId)} onOpen={onOpen} onWater={onWater} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Add plant                                                                */
/* ---------------------------------------------------------------------- */

function AddTab({ garden, onAdd, onDone }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [nickname, setNickname] = useState("");
  const [spotId, setSpotId] = useState("");
  const [waterDays, setWaterDays] = useState(null);
  const [alreadyWatered, setAlreadyWatered] = useState(true);

  const [identifying, setIdentifying] = useState(false);
  const [idPreview, setIdPreview] = useState(null);
  const [idResult, setIdResult] = useState(null);
  const [idError, setIdError] = useState(null);
  const idFileRef = useRef(null);

  const matches = query.length > 0
    ? PLANT_DB.filter((p) => p.commonName.toLowerCase().includes(query.toLowerCase())).slice(0, 8)
    : [];

  const pick = (p) => {
    setSelected(p);
    setNickname(p.commonName);
    setWaterDays(p.waterDays);
    setQuery(p.commonName);
    setIdResult(null);
    setIdPreview(null);
  };

  const handleIdentifyFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIdError(null);
    setIdResult(null);
    setIdPreview(URL.createObjectURL(file));
    setIdentifying(true);
    try {
      const base64 = await fileToBase64(file);
      const result = await identifyPlantFromPhoto(base64, file.type || "image/jpeg");
      setIdResult(result);
    } catch (err) {
      setIdError("Couldn't read that photo clearly. Try a closer, well-lit shot of the leaves.");
    } finally {
      setIdentifying(false);
    }
  };

  const matchedPlant = idResult?.matchId ? PLANT_DB.find((p) => p.id === idResult.matchId) : null;
  const alternatePlants = (idResult?.alternateIds || [])
    .map((id) => PLANT_DB.find((p) => p.id === id))
    .filter(Boolean);

  const submit = () => {
    if (!selected || !nickname.trim()) return;
    const spot = garden.spots.find((s) => s.id === spotId);
    const newPlant = {
      id: `${selected.id}-${Date.now()}`,
      speciesId: selected.id,
      commonName: selected.commonName,
      sciName: selected.sciName,
      icon: selected.icon,
      light: selected.light,
      petSafe: selected.petSafe,
      difficulty: selected.difficulty,
      nickname: nickname.trim(),
      waterDays: waterDays || selected.waterDays,
      recommendedWaterDays: selected.waterDays,
      lastWatered: alreadyWatered ? todayStr() : new Date(Date.now() - (selected.waterDays + 1) * DAY_MS).toISOString().slice(0, 10),
      spotId: spotId || null,
      spotApproval: null,
      lastHealthStatus: null,
      healthHistory: [],
    };
    onAdd(newPlant);
    onDone();
  };

  const previewPlant = selected
    ? {
        id: "preview",
        nickname: nickname.trim() || selected.commonName,
        sciName: selected.sciName,
        icon: selected.icon,
        light: selected.light,
        waterDays: waterDays || selected.waterDays,
        lastWatered: alreadyWatered
          ? todayStr()
          : new Date(Date.now() - ((waterDays || selected.waterDays) + 1) * DAY_MS).toISOString().slice(0, 10),
        lastHealthStatus: null,
      }
    : null;
  const previewSpot = spotId ? garden.spots.find((s) => s.id === spotId) : null;

  return (
    <div>
      <p className="page-eyebrow">New entry</p>
      <h1 className="display page-title">Add a specimen</h1>

      <div style={{ display: "flex", gap: 28, flexWrap: "wrap", alignItems: "flex-start" }}>
        <div style={{ flex: "1 1 400px", maxWidth: "clamp(400px, 42vw, 560px)" }}>
          <div className="card" style={{ padding: 22, marginBottom: 16 }}>
        <label className="field-label">Identify by photo</label>
        <p style={{ fontSize: 12.5, opacity: 0.7, margin: "0 0 12px 0" }}>
          Upload a clear photo of the plant — its leaves, shape, and pattern — and AI will suggest a match from the database.
        </p>
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
          {idPreview && (
            <img
              src={idPreview} alt="Plant to identify"
              style={{ width: 56, height: 56, objectFit: "cover", borderRadius: 4, border: "1px solid rgba(43,36,23,0.2)" }}
            />
          )}
          <button className="btn btn-brass" onClick={() => idFileRef.current?.click()} disabled={identifying}>
            {identifying ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> : <Camera size={14} />}
            {identifying ? "Identifying…" : "Upload photo"}
          </button>
          <input ref={idFileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleIdentifyFile} />
        </div>
        {idError && <p style={{ fontSize: 12.5, color: "var(--rust)" }}>{idError}</p>}

        {idResult && (
          <div style={{ fontSize: 13 }}>
            {matchedPlant ? (
              <>
                <span className={`tag ${idResult.confidence === "high" ? "" : idResult.confidence === "medium" ? "warn" : "bad"}`}>
                  <Sparkles size={11} /> {titleCase(idResult.confidence)} confidence
                </span>
                <p style={{ margin: "8px 0 4px 0" }}>
                  Looks like a <strong>{matchedPlant.commonName}</strong> <span className="sci" style={{ fontSize: 12 }}>{matchedPlant.sciName}</span>
                </p>
                {idResult.reasoning && <p style={{ margin: "0 0 10px 0", opacity: 0.75 }}>{idResult.reasoning}</p>}
                <button className="btn btn-moss" onClick={() => pick(matchedPlant)}><CheckCircle2 size={14} /> Use this match</button>
              </>
            ) : (
              <p style={{ margin: "0 0 8px 0" }}>
                Couldn't confidently match this to a plant in our database. Try a clearer photo, or search for it manually below.
                {idResult.reasoning && <span style={{ display: "block", opacity: 0.7, marginTop: 4 }}>{idResult.reasoning}</span>}
              </p>
            )}
            {alternatePlants.length > 0 && (
              <div style={{ marginTop: matchedPlant ? 12 : 4 }}>
                <p className="field-label" style={{ marginBottom: 6 }}>Other possibilities</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {alternatePlants.map((p) => (
                    <button key={p.id} className="btn btn-ghost" style={{ padding: "5px 10px", fontSize: 12 }} onClick={() => pick(p)}>
                      {p.commonName}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="card" style={{ padding: 22 }}>
        <label className="field-label">Search the plant database</label>
        <input
          className="input"
          placeholder="e.g. pothos, snake plant, monstera…"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setSelected(null); }}
          style={{ marginBottom: 6 }}
        />
        {matches.length > 0 && !selected && (
          <div style={{ border: "1px solid rgba(43,36,23,0.15)", borderRadius: 3, marginBottom: 14, overflow: "hidden" }}>
            {matches.map((m) => (
              <div
                key={m.id}
                onClick={() => pick(m)}
                style={{ padding: "9px 12px", fontSize: 13.5, cursor: "pointer", borderBottom: "1px solid rgba(43,36,23,0.08)", display: "flex", justifyContent: "space-between" }}
                onMouseDown={(e) => e.preventDefault()}
              >
                <span>{m.commonName} <span className="sci" style={{ fontSize: 12 }}>{m.sciName}</span></span>
                <ChevronRight size={14} opacity={0.5} />
              </div>
            ))}
          </div>
        )}

        {selected && (
          <>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "6px 0 16px 0" }}>
              <span className="tag"><Sun size={11} /> {LIGHT_LABELS[selected.light]}</span>
              <span className="tag"><Droplet size={11} /> every ~{selected.waterDays}d</span>
              <span className="tag">{selected.difficulty}</span>
              {!selected.petSafe && <span className="tag bad">toxic to pets</span>}
            </div>

            <label className="field-label">Nickname</label>
            <input className="input" style={{ marginBottom: 14 }} value={nickname} onChange={(e) => setNickname(e.target.value)} />

            <label className="field-label">Watering interval (days)</label>
            <input className="input" type="number" min="1" value={waterDays ?? ""} onChange={(e) => setWaterDays(Number(e.target.value))} />
            <div style={{ marginBottom: 14 }}>
              <WaterDeviationNote plant={{ waterDays: waterDays || selected.waterDays, recommendedWaterDays: selected.waterDays }} />
            </div>

            <label className="field-label">Sunlight spot</label>
            <select className="select" style={{ marginBottom: 14 }} value={spotId} onChange={(e) => setSpotId(e.target.value)}>
              <option value="">No spot assigned yet</option>
              {garden.spots.map((s) => (
                <option key={s.id} value={s.id}>{s.name} — {LIGHT_LABELS[s.light]}</option>
              ))}
            </select>

            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, marginBottom: 18 }}>
              <input type="checkbox" checked={alreadyWatered} onChange={(e) => setAlreadyWatered(e.target.checked)} />
              I watered it today
            </label>

            <button className="btn btn-brass" onClick={submit} disabled={!nickname.trim()}>
              <Plus size={15} /> Add to collection
            </button>
          </>
        )}
          </div>
        </div>

        <div style={{ flex: "1 1 300px", maxWidth: 400, position: "sticky", top: 20 }}>
          <label className="field-label" style={{ marginBottom: 10 }}>Live preview</label>
          {previewPlant ? (
            <div style={{ pointerEvents: "none" }}>
              <SpecimenCard plant={previewPlant} spot={previewSpot} onOpen={() => {}} onWater={() => {}} />
            </div>
          ) : (
            <div className="empty-state" style={{ border: "1px dashed rgba(241,236,221,0.25)", borderRadius: 6, padding: "48px 20px" }}>
              <Leaf size={26} style={{ marginBottom: 10, opacity: 0.5 }} />
              <p style={{ margin: 0 }}>Pick or identify a plant to preview its ledger card here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Light spots                                                             */
/* ---------------------------------------------------------------------- */

function SpotsTab({ garden, onAddSpot, onDeleteSpot, onUpdatePlant }) {
  const [name, setName] = useState("");
  const [light, setLight] = useState("medium");
  const [scanning, setScanning] = useState(false);
  const [scanPreview, setScanPreview] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const [scanError, setScanError] = useState(null);
  const scanFileRef = useRef(null);

  const submit = () => {
    if (!name.trim()) return;
    onAddSpot({ id: `spot-${Date.now()}`, name: name.trim(), light });
    setName("");
    setScanResult(null);
    setScanPreview(null);
    setScanError(null);
  };

  const handleScanFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setScanError(null);
    setScanResult(null);
    setScanPreview(URL.createObjectURL(file));
    setScanning(true);
    try {
      const base64 = await fileToBase64(file);
      const result = await analyzeLightLevel(base64, file.type || "image/jpeg");
      setScanResult(result);
      if (LIGHT_LEVELS.includes(result.light)) setLight(result.light);
    } catch (err) {
      setScanError("Couldn't read that photo clearly. Try a well-lit shot taken from where the plant would sit.");
    } finally {
      setScanning(false);
    }
  };

  return (
    <div>
      <p className="page-eyebrow">Sunlight</p>
      <h1 className="display page-title">Light map</h1>

      <div className="card" style={{ padding: 18, marginBottom: 22, maxWidth: "clamp(460px, 46vw, 640px)" }}>
        <label className="field-label">New spot</label>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <input className="input" placeholder="e.g. Kitchen windowsill" value={name} onChange={(e) => setName(e.target.value)} />
          <select className="select" style={{ maxWidth: 170 }} value={light} onChange={(e) => { setLight(e.target.value); setScanResult(null); }}>
            {LIGHT_LEVELS.map((l) => <option key={l} value={l}>{LIGHT_LABELS[l]}</option>)}
          </select>
          <button className="btn btn-moss" onClick={submit}><Plus size={14} /></button>
        </div>

        <div style={{ paddingTop: 12, borderTop: "1px dashed rgba(43,36,23,0.2)" }}>
          <label className="field-label">Not sure of the light level?</label>
          <p style={{ fontSize: 12.5, opacity: 0.7, margin: "0 0 10px 0" }}>Snap a photo of the spot and let AI estimate it for you.</p>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {scanPreview && <img src={scanPreview} alt="spot preview" style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 4, border: "1px solid rgba(43,36,23,0.2)" }} />}
            <button className="btn btn-brass" onClick={() => scanFileRef.current?.click()} disabled={scanning}>
              {scanning ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> : <Camera size={14} />}
              {scanning ? "Analyzing…" : "Scan a photo"}
            </button>
            <input ref={scanFileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleScanFile} />
          </div>
          {scanError && <p style={{ fontSize: 12.5, color: "var(--rust)", marginTop: 8 }}>{scanError}</p>}
          {scanResult && (
            <div style={{ marginTop: 10, fontSize: 13 }}>
              <span className="tag"><Sparkles size={11} /> Detected: {LIGHT_LABELS[scanResult.light] || scanResult.light} ({scanResult.confidence} confidence)</span>
              <p style={{ margin: "8px 0 0 0", opacity: 0.8 }}>{scanResult.reasoning}</p>
            </div>
          )}
        </div>
      </div>

      {garden.spots.length === 0 ? (
        <div className="empty-state"><p>No spots mapped yet. Add the sunny (or shady) corners of your home above.</p></div>
      ) : (
        <div className="grid">
          {garden.spots.map((spot) => {
            const plantsHere = garden.plants.filter((p) => p.spotId === spot.id);
            return (
              <div className="card spot-card" key={spot.id}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <p className="display" style={{ margin: 0, fontSize: 16 }}>{spot.name}</p>
                    <span className="tag"><Sun size={11} /> {LIGHT_LABELS[spot.light]}</span>
                  </div>
                  <button className="btn btn-danger" style={{ padding: "5px 8px" }} onClick={() => onDeleteSpot(spot.id)}><Trash2 size={13} /></button>
                </div>
                {plantsHere.length === 0 ? (
                  <p style={{ fontSize: 12.5, opacity: 0.6, marginTop: 10 }}>No plants placed here yet.</p>
                ) : (
                  plantsHere.map((p) => {
                    const match = matchLight(p.light, spot.light);
                    return (
                      <div className="plant-in-spot" key={p.id}>
                        <span>{p.nickname}</span>
                        <span className={`tag ${match.level === "ideal" ? "" : match.level === "workable" ? "warn" : "bad"}`}>
                          {match.level === "ideal" ? <CheckCircle2 size={11} /> : <AlertTriangle size={11} />} {match.level}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Photobook                                                                */
/* ---------------------------------------------------------------------- */

function polaroidRotation(id) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) | 0;
  const deg = (Math.abs(hash) % 9) - 4; // -4deg .. +4deg
  return deg;
}

function PhotobookTab({ garden, onAddPhoto, onDeletePhoto, onGoAdd }) {
  const [pendingFile, setPendingFile] = useState(null); // { dataUrl }
  const [plantId, setPlantId] = useState("");
  const [date, setDate] = useState(todayStr());
  const [caption, setCaption] = useState("");
  const [filterId, setFilterId] = useState("all");
  const [reading, setReading] = useState(false);
  const [error, setError] = useState(null);
  const fileRef = useRef(null);

  const photos = garden.photos || [];
  const visiblePhotos = filterId === "all" ? photos : photos.filter((p) => p.plantId === filterId);
  const sorted = visiblePhotos.slice().sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

  const handlePick = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setReading(true);
    try {
      const dataUrl = await fileToCompressedDataUrl(file);
      setPendingFile({ dataUrl });
      setPlantId(garden.plants[0]?.id || "");
      setDate(todayStr());
      setCaption("");
    } catch (err) {
      setError("Couldn't read that photo. Try a different file.");
    } finally {
      setReading(false);
      e.target.value = "";
    }
  };

  const cancelPending = () => {
    setPendingFile(null);
    setError(null);
  };

  const submit = () => {
    if (!pendingFile || !plantId) return;
    const plant = garden.plants.find((p) => p.id === plantId);
    if (!plant) return;
    onAddPhoto({
      id: `photo-${Date.now()}`,
      plantId: plant.id,
      plantName: plant.nickname,
      date,
      caption: caption.trim(),
      dataUrl: pendingFile.dataUrl,
    });
    setPendingFile(null);
    setCaption("");
  };

  return (
    <div>
      <p className="page-eyebrow">Photobook</p>
      <h1 className="display page-title">Snapshots from the garden</h1>

      {garden.plants.length === 0 ? (
        <div className="empty-state">
          <ImageIcon size={28} style={{ marginBottom: 10, opacity: 0.5 }} />
          <p>Add a plant to your collection first, then you can start labeling photos of it.</p>
          <button className="btn btn-brass" style={{ marginTop: 8 }} onClick={onGoAdd}><Plus size={15} /> Add a specimen</button>
        </div>
      ) : (
        <>
          <div className="card" style={{ padding: "18px 20px", marginBottom: 22 }}>
            {!pendingFile ? (
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <button className="btn btn-brass" onClick={() => fileRef.current?.click()} disabled={reading}>
                  {reading ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> : <Camera size={14} />}
                  {reading ? "Reading…" : "Upload a photo"}
                </button>
                <span style={{ fontSize: 12.5, opacity: 0.65 }}>Pick a photo, then label which plant it is and the date it was taken.</span>
                <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handlePick} />
              </div>
            ) : (
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                <img
                  src={pendingFile.dataUrl}
                  alt="New upload preview"
                  style={{ width: 140, height: 140, objectFit: "cover", borderRadius: 4, border: "1px solid rgba(43,36,23,0.2)" }}
                />
                <div style={{ flex: 1, minWidth: 220 }}>
                  <label className="field-label">Which plant is this?</label>
                  <select className="select" style={{ marginBottom: 12 }} value={plantId} onChange={(e) => setPlantId(e.target.value)}>
                    {garden.plants.map((p) => (
                      <option key={p.id} value={p.id}>{p.nickname} — {p.commonName}</option>
                    ))}
                  </select>

                  <label className="field-label">Date taken</label>
                  <input
                    className="input" style={{ marginBottom: 12, maxWidth: 200 }}
                    type="date" value={date} onChange={(e) => setDate(e.target.value)}
                  />

                  <label className="field-label">Note (optional)</label>
                  <input
                    className="input" style={{ marginBottom: 14 }}
                    placeholder="e.g. New leaf unfurling!"
                    value={caption} onChange={(e) => setCaption(e.target.value)}
                  />

                  <div style={{ display: "flex", gap: 10 }}>
                    <button className="btn btn-moss" onClick={submit} disabled={!plantId}><Plus size={14} /> Add to photobook</button>
                    <button className="btn btn-ghost" onClick={cancelPending}><X size={14} /> Cancel</button>
                  </div>
                </div>
              </div>
            )}
            {error && <p style={{ fontSize: 12.5, color: "var(--rust)", marginTop: 10 }}>{error}</p>}
          </div>

          {photos.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
              <label className="field-label" style={{ marginBottom: 0 }}>Show</label>
              <select className="select" style={{ maxWidth: 240 }} value={filterId} onChange={(e) => setFilterId(e.target.value)}>
                <option value="all">All plants</option>
                {garden.plants.map((p) => (
                  <option key={p.id} value={p.id}>{p.nickname}</option>
                ))}
              </select>
            </div>
          )}

          {sorted.length === 0 ? (
            <div className="empty-state">
              <p>{photos.length === 0 ? "No photos yet — upload one to start the photobook." : "No photos for that plant yet."}</p>
            </div>
          ) : (
            <div className="polaroid-grid">
              {sorted.map((ph) => (
                <div key={ph.id} className="polaroid" style={{ "--r": `${polaroidRotation(ph.id)}deg` }}>
                  <button className="polaroid-delete" onClick={() => onDeletePhoto(ph.id)} title="Remove photo"><Trash2 size={12} /></button>
                  <img src={ph.dataUrl} alt={ph.plantName} />
                  <div className="polaroid-caption">
                    <div className="polaroid-name">{ph.plantName}</div>
                    {ph.caption && <div className="polaroid-note">{ph.caption}</div>}
                    <div className="polaroid-date mono"><Calendar size={10} /> {formatDisplayDate(ph.date)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Plant detail modal                                                       */
/* ---------------------------------------------------------------------- */

function PlantModal({ plant, spot, spots, onClose, onUpdate, onWater, onDelete }) {
  const [analyzing, setAnalyzing] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const fileRef = useRef(null);
  const match = spot ? matchLight(plant.light, spot.light) : null;

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setPreview(URL.createObjectURL(file));
    setAnalyzing(true);
    try {
      const base64 = await fileToBase64(file);
      const result = await analyzePlantHealth(plant, base64, file.type || "image/jpeg");
      const cleanedResult = {
        ...result,
        summary: sentenceCase(result.summary),
        issues: (result.issues || []).map(sentenceCase),
        actions: (result.actions || []).map(sentenceCase),
      };
      const entry = { date: todayStr(), ...cleanedResult };
      onUpdate({
        lastHealthStatus: result.status,
        healthHistory: [entry, ...(plant.healthHistory || [])].slice(0, 10),
      });
    } catch (err) {
      setError("Couldn't read that photo clearly. Try a closer, well-lit shot.");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={18} /></button>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <PlantIcon name={plant.icon} size={22} color="var(--moss)" />
          <h2 className="display" style={{ margin: 0, fontSize: 22 }}>{plant.nickname}</h2>
        </div>
        <p className="sci" style={{ margin: "0 0 14px 0" }}>{plant.sciName}</p>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
          <span className="tag"><Sun size={11} /> {LIGHT_LABELS[plant.light]}</span>
          <span className="tag">{plant.difficulty}</span>
          {!plant.petSafe && <span className="tag bad">toxic to pets</span>}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 18, paddingBottom: 18, borderBottom: "1px dashed rgba(43,36,23,0.2)" }}>
          <WaterGauge plant={plant} size={76} />
          <div style={{ flex: 1 }}>
            <label className="field-label">Watering interval (days)</label>
            <input
              className="input" type="number" min="1" style={{ maxWidth: 100 }}
              value={plant.waterDays}
              onChange={(e) => onUpdate({ waterDays: Number(e.target.value) })}
            />
            <div style={{ maxWidth: 260 }}><WaterDeviationNote plant={plant} /></div>
            <div style={{ marginTop: 8 }}><button className="btn btn-moss" onClick={onWater}><Droplet size={14} /> Mark watered today</button></div>
          </div>
        </div>

        <div style={{ marginBottom: 18, paddingBottom: 18, borderBottom: "1px dashed rgba(43,36,23,0.2)" }}>
          <label className="field-label">Sunlight spot</label>
          <select
            className="select" style={{ marginBottom: 8 }}
            value={plant.spotId || ""}
            onChange={(e) => onUpdate({ spotId: e.target.value || null, spotApproval: null })}
          >
            <option value="">No spot assigned</option>
            {spots.map((s) => <option key={s.id} value={s.id}>{s.name} — {LIGHT_LABELS[s.light]}</option>)}
          </select>
          {spot && match && (
            <div style={{ fontSize: 13 }}>
              <p style={{ margin: 0 }}>
                <span className={`tag ${match.level === "ideal" ? "" : match.level === "workable" ? "warn" : "bad"}`}>
                  {match.level === "ideal" ? <CheckCircle2 size={11} /> : <AlertTriangle size={11} />} {match.msg}
                </span>
              </p>
            </div>
          )}
        </div>

        <div style={{ marginBottom: 6 }}>
          <label className="field-label">AI health check</label>
          <p style={{ fontSize: 12.5, opacity: 0.7, margin: "0 0 10px 0" }}>Upload a clear photo and get an instant read on how it's doing.</p>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
            {preview && <img src={preview} alt="preview" style={{ width: 56, height: 56, objectFit: "cover", borderRadius: 4, border: "1px solid rgba(43,36,23,0.2)" }} />}
            <button className="btn btn-brass" onClick={() => fileRef.current?.click()} disabled={analyzing}>
              {analyzing ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> : <Camera size={14} />}
              {analyzing ? "Analyzing…" : "Upload photo"}
            </button>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />
          </div>
          {error && <p style={{ fontSize: 12.5, color: "var(--rust)" }}>{error}</p>}

          {(plant.healthHistory || []).map((h, i) => (
            <div key={i} className="card" style={{ padding: "12px 14px", marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span className={`health-badge health-${h.status === "healthy" ? "healthy" : h.status === "minor issues" ? "minor" : h.status === "critical" ? "critical" : "attention"}`}>
                  {h.status === "healthy" ? <CheckCircle2 size={13} /> : <AlertTriangle size={13} />} {titleCase(h.status)}
                </span>
                <span className="mono" style={{ fontSize: 11, opacity: 0.6 }}>{h.date}</span>
              </div>
              {h.summary && (
                <ul style={{ margin: "0 0 8px 0", paddingLeft: 18, fontSize: 13, listStyleType: "disc", listStylePosition: "outside" }}>
                  <li>{h.summary}</li>
                </ul>
              )}
              {h.issues?.length > 0 && (
                <>
                  <p className="field-label" style={{ marginBottom: 2 }}>Issues spotted</p>
                  <p style={{ fontSize: 11, opacity: 0.6, margin: "0 0 4px 0", fontStyle: "italic" }}>Jot notes — what stood out in the photo</p>
                  <ul style={{ margin: "0 0 8px 0", paddingLeft: 18, fontSize: 12.5, listStyleType: "disc", listStylePosition: "outside" }}>
                    {h.issues.map((iss, j) => <li key={j}>{iss}</li>)}
                  </ul>
                </>
              )}
              {h.actions?.length > 0 && (
                <>
                  <p className="field-label" style={{ marginBottom: 3 }}>Do this now</p>
                  <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12.5, listStyleType: "disc", listStylePosition: "outside" }}>
                    {h.actions.map((a, j) => <li key={j}>{a}</li>)}
                  </ul>
                </>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px dashed rgba(43,36,23,0.2)" }}>
          <button className="btn btn-danger" onClick={onDelete}><Trash2 size={14} /> Remove from collection</button>
        </div>
      </div>
    </div>
  );
}
