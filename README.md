# Project of Data Visualization (COM-480)

| Student's name | SCIPER |
| -------------- | ------ |
| Victor Nazianzeno--Le Jamtel|312075 |
| Javier García Arredondo|311166 |
| Hind El Bouchrifi| 300862 |

[Milestone 1](#milestone-1) • [Milestone 2](#milestone-2) • [Milestone 3](#milestone-3)

## Milestone 1 (7th April, 5pm)
readme update
![](https://github.com/com-480-data-visualization/project-2023-vireal/blob/master/imgs/ai_generated_logo.png)

**10% of the final grade**

### Dataset

We will be working with various datasets related to coffee. The main dataset we will be utilizing is available at https://github.com/jldbc/coffee-quality-database. This dataset consists of reviews for 1312 arabica and 28 robusta coffee beans from the Coffee Quality Institute's trained reviewers in January 2018. The dataset includes features about the quality of the coffee, the characteristics of the beans, and information about the production farms. It is an extensive and comprehensive dataset that is supported by a reputable institution in the coffee production and quality assessment field. Additionally, the dataset already includes a cleaned version of the raw data, which eliminates the need for supplementary the data preprocessing. 

To complement this dataset, we will integrate four smaller datasets that approach the topic from a different perspective:
- **coffee_prices_historical**: 
[Link to the source.](https://www.kaggle.com/datasets/williamriveraramos/coffee-prices-historical)
This dataset contains records about daily standard coffee prices from 1973 to 2022.
- **coffee_consumption_by_country**:
[Link to the source.](https://www.kaggle.com/datasets/nurielreuven/coffee-consumption-by-country-2022)
This dataset provides information on the consumption levels of coffee in different countries for the year 2019.
- **coffee_growing_countries**:
[Link to the source.](https://www.kaggle.com/datasets/albyati/coffee-growing-countries)
This dataset includes descriptions of the primary coffee growing countries.
- **coffee_producer_countries**:
[Link to the source.](https://www.kaggle.com/datasets/yamaerenay/ico-coffee-dataset-worldwide)
This dataset offers details on the production, imports and exports of coffee by country from 1990 to 2018. It is supported by the Internation Coffee Organization.

These four datasets contain concise data and simple data types, mainly `integers`. Therefore, they do not require extensive pre-processing, mainly just fitting the data together, such as aligning them to the same time frame.


### Problematic

Coffee is one of the most popular and widely consumed beverages in the world. Apart from its presence in gastronomy, it also symbolises a social phenomenom. Coffee accompanies the mornings of many people everyday and creates a good context of inspiration for countless individuals.

As daily coffee consumers, it is relevant for us to learn about the different varieties of coffee, and how the production and consumption patterns change due to different factors. Exploring the geographical, cultural, commercial and culinar aspects of coffee can be fascinating to understand and analyse.

Our work will revolve around the two most common coffee grades, namely Arabica and Robusta. They differ in their zone of harvest, their taste profile, but also their effect on the human body. Those insights will be a key part of our visualization, taking the shape of a visual comparative study.

Besides the study of varieties, we will produce a visualization of the coffee consumption accross countries, the principal coffee producers and the historical price of coffee along the years.

Regarding the target audience of our work, coffee is present in the life of people from different backgrounds and social status. This project is thus, for a major part, a source of inspiration for coffee lovers to understand better what characterizes this small little grain that changes their lives. As well as coffee producers, retailers and researchers to have an overall view of the distribution of features related to their economy or research like where coffee producers are concentrated and where it would be easy to find clients.


### Exploratory Data Analysis

#### Analysis of the main dataset

The coffee-quality-database contains many different parameters describing the taste profile of arabica and robusta beans. To visualize how those characteristics coexist to make for a unique taste, we generated a heatmap of the correlation matrix in order to show correlations between, for example, sweetness and acidity.

![](https://github.com/com-480-data-visualization/project-2023-vireal/blob/master/imgs/taste_profile_heatmap.png)

Having an idea of the correlation between different characteristics of the taste profile will allow us to construct very insighful visuals when doing the comparative study of Robusta and Arabica.

##### Coffee prices insights:
Some basic statistics about the worldwide coffee prices in pounds in 2018
| Statistic | value (£) |
| -------------- | ------ |
| count | 12147.000000 |
| mean | 1.267276 |
| std | 0.478930 |
| min | 0.425000 |
| 25% | 0.948500 |
| 50% | 1.237000 |
| 75% | 1.470000 |
| max | 3.356300 |

##### Coffee consumption insights:
Here is a barplot that show the distribution of coffee consumption per country in kg in 2019

![](https://github.com/com-480-data-visualization/project-2023-vireal/blob/master/imgs/cons.png)


##### Coffee production insights:
Here is a barplot that show the total production by all exporting countries (In thousand 60 kg bags) in 2018

![](https://github.com/com-480-data-visualization/project-2023-vireal/blob/master/imgs/production.png)

### Related work

The originality of our project comes mainly from comparing the two famous coffee varieties: "Arabica" and "Robusta", as well as a worldwide overview of the distribution related to coffee production and comsumption in a more interactive manner.

While there are many available resources online analyzing different coffee roasts, they usually don't focus on the visual aspect of their study. 
Taking a visual approach can provide a more intuitive and holistic comparison of the two types of coffee beans.
In comparison, we can cite the work of
[https://rpubs.com/Aashu26698/coffee-review-viz](Aashutosh Sehgal and al.)

For instance, we have consulted an extensive work about coffee data along three Medium articles. The contributions mainly reside in the data analysis field, and plots are dense and technical. We . The first (https://towardsdatascience.com/a-review-of-coffee-data-grades-and-flavors-5ccb6fc51941) corresponds to coffee grade and flavor. It focuses on cupping scores (also known as Q-scores or grades). 

 Cupping Scores (
 correlation
 PCA
 


where 
 



## Milestone 2 (7th May, 5pm)

**10% of the final grade**


## Milestone 3 (4th June, 5pm)

**80% of the final grade**


## Late policy

- < 24h: 80% of the grade for the milestone
- < 48h: 70% of the grade for the milestone

