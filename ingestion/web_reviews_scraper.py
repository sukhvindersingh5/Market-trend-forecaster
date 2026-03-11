import requests
from bs4 import BeautifulSoup
import pandas as pd
import re

products = {
    "Google Nest Mini": "https://www.techradar.com/reviews/google-nest-mini",
    "Apple HomePod Mini": "https://www.techradar.com/reviews/apple-homepod-mini",
    "Amazon Alexa": "https://www.techradar.com/reviews/amazon-echo-dot"
}

all_reviews = []

def clean_text(text):
    text = text.lower()
    text = re.sub(r"[^\w\s]", "", text)
    return text.strip()

for product, url in products.items():
    print("Scraping:", product)
    response = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})
    soup = BeautifulSoup(response.text, "html.parser")

    paragraphs = soup.find_all("p")

    for p in paragraphs:
        text = p.get_text().strip()
        if len(text) > 60:
            all_reviews.append({
                "product": product,
                "review_content": clean_text(text),
                "rating": None,
                "review_date": None,
                "variant": None,
                "source": "web_scrape"
            })

df = pd.DataFrame(all_reviews)
df.to_csv("data/processed/web_reviews_scraped.csv", index=False)

print("Saved", len(df), "web scraped reviews")
