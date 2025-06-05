import time
import undetected_chromedriver as uc
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

def parse_yandex(query):
    options = uc.ChromeOptions()
    options.headless = True
    driver = uc.Chrome(options=options)

    driver.get("https://market.yandex.ru/")
    time.sleep(2)

    search_input = driver.find_element(By.ID, "header-search")
    search_input.send_keys(query)
    search_input.send_keys(Keys.ENTER)
    time.sleep(5)

    products = []
    cards = driver.find_elements(By.CSS_SELECTOR, "article[data-autotest-id='product-snippet']")[:10]

    for card in cards:
        try:
            name = card.find_element(By.TAG_NAME, "h3").text
            price = card.find_element(By.CSS_SELECTOR, "span._1ArMm").text
            link = card.find_element(By.TAG_NAME, "a").get_attribute("href")
            image = card.find_element(By.TAG_NAME, "img").get_attribute("src")

            products.append({
                "name": name,
                "price": float(price.replace("₽", "").replace(" ", "")),
                "image": image,
                "url": f"https://market.yandex.ru{link}" if link.startswith("/") else link,
                "rating": None,
                "reviews": None,
                "availability": "Уточняйте",
                "source": "yandex"
            })
        except Exception as e:
            print("[yandex] ошибка:", e)

    driver.quit()
    return products
