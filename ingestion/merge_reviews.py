import pandas as pd

amazon = pd.read_csv("data/processed/amazon_reviews_clean.csv")
youtube = pd.read_csv("data/processed/youtube_reviews_clean.csv")

# --- STANDARDIZE AMAZON ---
amazon_std = pd.DataFrame({
    "platform": "amazon",
    "product": amazon["product"],
    "text": amazon["review_content"]
})

# --- STANDARDIZE YOUTUBE ---
youtube_std = youtube[["platform", "product", "text"]]

# --- MERGE ---
merged = pd.concat([amazon_std, youtube_std], ignore_index=True)

merged = merged.drop_duplicates(subset=["text"])
merged = merged[merged["text"].astype(str).str.len() > 20]

merged.to_csv("data/processed/all_reviews_clean.csv", index=False)

print("Saved", len(merged), "total reviews")
