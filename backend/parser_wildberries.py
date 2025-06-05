import time
import undetected_chromedriver as uc
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

def parse_wildberries(query):
    options = uc.ChromeOptions()
    options.headless = True
    driver = uc.Chrome(options=options)

    driver.get("https://www.wildberries.ru/")
    time.sleep(2)

    search_input = driver.find_element(By.ID, "searchInput")
    search_input.send_keys(query)
    search_input.send_keys(Keys.ENTER)
    time.sleep(5)

    products = []
    cards = driver.find_elements(By.CLASS_NAME, "product-card")[:10]

    for card in cards:
        try:
            name = card.find_element(By.CLASS_NAME, "product-card__name").text
            price = card.find_element(By.CLASS_NAME, "price__lower-price").text
            link = card.get_attribute("href")
            image = card.find_element(By.TAG_NAME, "img").get_attribute("src")

            products.append({
                "name": name,
                "price": float(price.replace("₽", "").replace(" ", "")),
                "image": image,
                "url": link,
                "rating": None,
                "reviews": None,
                "availability": "В наличии",
                "source": "wildberries"
            })
        except Exception as e:
            print("[wildberries] ошибка:", e)

    driver.quit()
    return products
