# Chart Example

## Line Chart

Demo pic
https://snag.gy/Qg3AuY.jpg


Usage with url

```
<appup-chart
url="https://demo7505738.mockable.io/line"
type="line"
title="linechart" 
:config='{subtitle:"testing",xtitle:"this is x testing",ytitle:"this is y testing",xcategory:["first","second","third","fourth","fifth"],ycategory:["first","second","third","fourth","fifth"],tooltip:true,legend:false}'/>

```



## Bar Chart

Demo pic 
https://snag.gy/peonxO.jpg


Usage with data

```
<appup-chart 
type="bar" 
data='[{"name": "Year 1800","data": [107, 31, 635, 203, 2]},{"name": "Year 1900","data": [133, 156, 947, 408, 6]},{"name": "Year 2000","data": [814, 841, 3714, 727, 31]}, {"name": "Year 2016","data": [1216, 1001, 4436, 738, 40]}]' title="barchart" 
config=''/>

```


## Bubble Chart

Demo pic
https://snag.gy/9DSaEN.jpg


Usage

```
<appup-chart 
url="https://demo7505738.mockable.io/bubble" 
type="bubble" 
title="bubblechart" 
config=''/>

```

with JSONdata

```

data='[{"name": "Year 1800","values": [107]},{"name": "Year 1900","values": [133]},{"name": "Year 2000","values": [814]},{"name": "Year 2016","values": [1216]}]' 

```

## Pie Chart

Demo pic
https://snag.gy/T4D5yA.jpg

Usage

```
<appup-chart 
url="https://demo7505738.mockable.io/pie" 
type="pie" 
title="piechart" 
config=''/>

```

with JSONdata

```
data='[{"name": "Year 1800","values": [107]},{"name": "Year 1900","values": [133]},{"name": "Year 2000","values": [814]},{"name": "Year 2016","values": [1216]}]'

```

## Funnel Chart

Demo pic
https://snag.gy/YEtla3.jpg

Usage

```
<appup-chart 
url="https://demo7505738.mockable.io/funnel" 
type="funnel" 
title="funnelchart" 
config=''/>

```

with JSONdata

```
data='[{"name": "Year 1800","values": [107]},{"name": "Year 1900","values": [133]},{"name": "Year 2000","values": [814]},{"name": "Year 2016","values": [1216]}]'

```