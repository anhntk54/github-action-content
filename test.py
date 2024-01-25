import requests
import json

url = "https://fobic.mediclowd.com/cdm_delivery/viettel/webhook"

payload = json.dumps({
  "DATA": {
    "ORDER_NUMBER": "18404738722229",
    "ORDER_REFERENCE": "184047387ss2229",
    "ORDER_STATUSDATE": "12/06/2023 14:36:05",
    "ORDER_STATUS": 502,
    "STATUS_NAME": "Nhận từ bưu tá - Bưu cục gốc",
    "LOCALION_CURRENTLY": "TT Quận 1 - Hồ Chí Minh",
    "NOTE": "Giao cho bưu cục",
    "MONEY_COLLECTION": 1500000,
    "MONEY_FEECOD": 0,
    "MONEY_TOTAL": 45650,
    "EXPECTED_DELIVERY": "Khoảng 2 ngày làm việc",
    "PRODUCT_WEIGHT": 245,
    "ORDER_SERVICE": "SCOD"
  },
  "TOKEN": "testss"
})
headers = {
  'Content-Type': 'application/json',
  'Cookie': 'session_id=f7bc217edd9f96d3c1c2e35e42d41fe8d0a96a29'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
