from app.database import raw_data_collection

async def generate_market_insights():

    cursor = raw_data_collection.find({})
    data = await cursor.to_list(length=100)

    positive = sum(1 for d in data if d.get("sentiment") == "positive")
    negative = sum(1 for d in data if d.get("sentiment") == "negative")

    insights = {
        "positive_reviews": positive,
        "negative_reviews": negative,
        "total_reviews": len(data)
    }

    return insights