from fastapi import APIRouter , HTTPException
from Schema.ChatSchema import Chatschema
from Configurations.config import secret
import openai
openai.api_key = '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'
# openai.api_key = secret.api_key


app=APIRouter()

@app.post("/chat")
def Chat(data:Chatschema):
    try:
      response = openai.chat.completions.create(
          model="gpt-3.5-turbo",  # You can use other models as well
          messages=[{"role": "user", "content": data.userinput}],
          max_tokens=150,  # Adjust as needed
          temperature=0.7,  # Adjust for more randomness (0.0 to 1.0)
      )

      return response.choices[0].message.content
    except openai.RateLimitError as e:
        raise HTTPException(status_code=429,detail="Rate Limit Reached.Please try again later.")
    except openai.AuthenticationError as e:
       raise HTTPException(status_code=401,detail=f"Authentication Failed!")
    