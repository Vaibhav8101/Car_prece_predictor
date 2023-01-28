from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
import pandas as pd
import numpy as np
import pickle
# Create your views here.

model=pickle.load(open('/home/vaibhav8101/Documents/car_price_prediction/LinearRegressionModel.pkl','rb'))

@api_view(['POST'])
def predict(request):
    predicted_price=model.predict(pd.DataFrame(columns=['name','company','year','kms_driven','fuel_type'],data=np.array([
        request.data['model'],request.data['company'],int(request.data['year']),int(request.data['kms_drive']),request.data['fuel_type']
    ]).reshape(1,5)))
    ans=str(round(predicted_price[0],2))
    request.data['price']=ans
    
    return JsonResponse(request.data)