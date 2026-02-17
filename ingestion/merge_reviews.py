import pandas as pd

amazon = pd.read_csv("data/processed/amazon_reviews_clean.csv")
youtube = pd.read_csv("data/processed/youtube_reviews_clean.csv")
web = pd.read_csv("data/processed/web_reviews_scraped.csv")

amazon_std = pd.DataFrame({
    "platform": "amazon",
    "product": amazon["product"],
    "text": amazon["review_content"]
})

youtube_std = youtube[["platform", "product", "text"]]

web_std = pd.DataFrame({
    "platform": "web",
    "product": web["product"],
    "text": web["review_content"]
})

merged = pd.concat([amazon_std, youtube_std, web_std], ignore_index=True)

merged = merged.drop_duplicates(subset=["text"])
merged = merged[merged["text"].astype(str).str.len() > 20]

merged.to_csv("data/processed/all_reviews_clean.csv", index=False)

print("Saved", len(merged), "total reviews")
