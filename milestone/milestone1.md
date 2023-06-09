## Milestone 1

![](https://github.com/com-480-data-visualization/project-2023-vireal/blob/master/imgs/ai_generated_logo.png)

### Dataset

We will be working with various datasets related to coffee. The main dataset we will be using is available at https://github.com/jldbc/coffee-quality-database. This dataset consists of reviews for 1312 arabica and 28 robusta coffee beans from the Coffee Quality Institute's trained reviewers in January 2018. The dataset includes features about the quality of the coffee, the characteristics of the beans, and information about the production farms. It is an extensive and comprehensive dataset that is supported by a reputable institution in the coffee production and quality assessment field. Additionally, the dataset already includes a cleaned version of the raw data, which eliminates the need for supplementary the data preprocessing. 

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
This dataset offers details on the production, imports and exports of coffee by country from 1990 to 2018. It is supported by the International Coffee Organization.

These four datasets contain concise data and simple data types, mainly `integers`. Therefore, they do not require extensive pre-processing, mainly just fitting the data together, such as aligning them to the same time frame.


### Problematic

Coffee is one of the most popular and widely consumed beverage in the world. Apart from its presence in gastronomy, it also symbolises a social phenomenom. Coffee accompanies the mornings of many people everyday and creates a good context of inspiration for countless individuals.

As daily coffee consumers, it is relevant for us to learn about the different varieties of coffee, and how the production and consumption patterns change due to different factors. Exploring the geographical, cultural, commercial and culinar aspects of coffee can be fascinating to understand and analyse.

Our work will revolve around the two most common coffee grades, namely Arabica and Robusta. They differ in their zone of harvest, their taste profile, but also their effect on the human body. Those insights will be a key part of our visualization, taking the shape of a visual comparative study.

Besides the study of these two varieties, we will produce a visualization of the coffee consumption accross countries, the principal coffee producers and the historical price of coffee along the years.

Regarding the target audience of our work, coffee is present in the life of people from different backgrounds and social status. This project is thus, for a major part, a source of inspiration for coffee lovers to understand what better characterizes this little grain that changes their lives. This work may also be a source of inspiration for coffee producers, retailers and researchers to have an overall view of the distribution of features related to their economy or research, like where coffee producers are concentrated and where it would be easy to find clients.


### Exploratory Data Analysis

#### Analysis of the main dataset

The `coffee-quality-database` contains many different parameters describing the taste profile of arabica and robusta beans. To visualize how those characteristics coexist to make for a unique taste, we generated a heatmap of the correlation matrix in order to show correlations between, for example, sweetness and acidity.

![](https://github.com/com-480-data-visualization/project-2023-vireal/blob/master/imgs/taste_profile_heatmap.png)

Having an idea of the link between different characteristics of the taste profile will allow us to construct very insighful visuals when doing the comparative study of Robusta and Arabica.

##### Coffee prices insights:
Some basic statistics about the worldwide coffee prices in pounds in 2018:
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
Here is a barplot that shows the distribution of coffee consumption per country in kg in 2019:

![](https://github.com/com-480-data-visualization/project-2023-vireal/blob/master/imgs/cons.png)

As we can see, USA, Germany, France, Japan and Italy are the biggest coffee consumers in the world. Which is not surprising since coffee is an important part of their culture and economy.

##### Coffee production insights:
Here is a barplot that shows the total production by all exporting countries (In thousand 60 kg bags) in 2018:

![](https://github.com/com-480-data-visualization/project-2023-vireal/blob/master/imgs/production.png)

From the plot we can notice that coffee production is mostly concentrated in Brazil, Vietnam, Columbia, Indonesia and Ethiopia. This is mainly due to the advantageous climate and land availabiities as well as rich tradition and expertise.

### Related work

The originality of our project lies primarily in the comparison of the two famous coffee varieties, Arabica and Robusta, as well as a worldwide overview of the distribution of coffee production and consumption in a more interactive manner.

While there are numerous resources available online analyzing different coffee roasts, they usually don't emphasize the visual aspect of their study. 
A visual approach can offer a more intuitive and holistic comparison of the two types of coffee beans. In comparison, we can cite the work of [Aashutosh Sehgal and al.](https://rpubs.com/Aashu26698/coffee-review-viz)

Additionally, we have consulted an extensive work about coffee data from three Medium articles. The contributions mainly reside in the data analysis field, and plots are dense and technical. The [first article](https://towardsdatascience.com/a-review-of-coffee-data-grades-and-flavors-5ccb6fc51941) deals with coffee grades and flavors. It focuses on cupping scores (also known as Q-scores or grades). The [second](https://towardsdatascience.com/comparing-coffee-using-pattern-recognition-35b92cca4502) compares coffee using pattern recognition and the [third](https://towardsdatascience.com/specialty-coffee-comparing-grading-methods-36777cae220f) evaluates different grading methods.

With respect to data visualization, we found inspiration from a variety of sources, such as the New York Times interactive visualizations from [How the Recession Reshaped the Economy, in 255 Charts](https://www.nytimes.com/interactive/2014/06/05/upshot/how-the-recession-reshaped-the-economy-in-255-charts.html?mtrref=undefined&gwh=5F0F3A546EAF81E62FAAB4C396594B63&gwt=pay&assetType=PAYWALL) and [2014 “the year in interactive storytelling”](https://www.nytimes.com/interactive/2014/12/29/us/year-in-interactive-storytelling.html?_r=0&mtrref=undefined&gwh=80657AC26C34BEF1AE164D0F76F73C90&gwt=pay&assetType=PAYWALL). Besides, we have extensively consulted the website "FlowingData", mainly the article [One Dataset, Visualized 25 Ways](https://flowingdata.com/2017/01/24/one-dataset-visualized-25-ways/) and the [guides for chart types](https://flowingdata.com/chart-types/).
 
