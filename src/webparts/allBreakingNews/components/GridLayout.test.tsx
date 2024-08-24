import * as React from 'react';
import { GridLayout } from "./GridLayout";
import { ISize } from '@fluentui/react/lib/Utilities';
import { useState, useEffect } from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
type Article = {
  id: number;
  title: string;
  description: string;
  author: string;
  publishedDate: string;
};
interface ITestGridLayout2Props {
  context: WebPartContext;
}


const TestGridLayout2: React.FC<ITestGridLayout2Props> = (props): React.ReactElement => {
  const [newsArticles, setArticles] = useState<Article[]>([]);

/*

  async function fetchSearchResults(context: WebPartContext, page: number = 1, pageSize: number = 2): Promise<void> {
    const startRow = (page - 1) * pageSize;
    const siteUrl = context.pageContext.web.absoluteUrl;
    const queryText = encodeURIComponent('SPContentType:"Site Page" AND IsDocument:True AND FileExtension:aspx AND PromotedState:2');
    const searchUrl = `${siteUrl}/_api/search/query?querytext='${queryText}'&sourceid='13a8b8d5-14f1-4873-a25e-caf5a1ed2b05'&selectproperties='Title,Path,FirstPublishedDate,Description,Author,FirstPublishedDate'&rowlimit=${pageSize}&startrow=${startRow}`;
    const response2: HttpClientResponse = await context.httpClient.get(searchUrl, HttpClient.configurations.v1);
    const data2 = await response2.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data2, 'text/xml');
    //const rootElement = xmlDoc.documentElement;
    //const childElements = rootElement.children;

    const articles: Article[] = [];
    const query = xmlDoc.getElementsByTagName('d:query')[0];
    if (query) {
      const primaryQueryResult = query.getElementsByTagName('d:PrimaryQueryResult')[0];
      if (primaryQueryResult) {
        const relevantResults = query.getElementsByTagName('d:RelevantResults')[0];
        if (relevantResults) {
          const table = relevantResults.getElementsByTagName('d:Table')[0];
          if (table) {
            const rows = table.getElementsByTagName('d:Rows')[0];
            if (rows) {
              const rowElements = rows.getElementsByTagName('d:element');
              Array.from(rowElements).forEach((row) => {
                const cells = row.getElementsByTagName('d:Cells')[0];
                if (cells) {
                  const cellElements = cells.getElementsByTagName('d:element');

                  let id: string="";
                  let siteId: string="";
                  let title: string="";
                  let description: string="";
                  let author: string="";
                  let publishedDate: string="";
                  let path: string="";
                  Array.from(cellElements).forEach((cell) => {

                    const keyElement = cell.getElementsByTagName('d:Key')[0];
                    const valueElement = cell.getElementsByTagName('d:Value')[0];

                    if (keyElement.textContent === "Title")
                      title = valueElement.textContent ? valueElement.textContent : "";
                    if (keyElement.textContent === "Path")
                      path = valueElement.textContent ? valueElement.textContent : "";
                    if (keyElement.textContent === "Description")
                      description = valueElement.textContent ? valueElement.textContent : "";
                    if (keyElement.textContent === "Author")
                      author = valueElement.textContent ? valueElement.textContent : "";
                    if (keyElement.textContent === "FirstPublishedDate")
                      publishedDate = valueElement.textContent ? valueElement.textContent : "";
                    if (keyElement.textContent === "IdentityListItemId")
                      id = valueElement.textContent ? valueElement.textContent : "";
                    if (keyElement.textContent === "SiteId")
                      siteId = valueElement.textContent ? valueElement.textContent : "";
                   
                  });

                  articles.push({id:id,title:title,description:description,siteId:siteId,publishedDate:publishedDate,author:author,path:path})
                }
              });
            }
          }
        }
      }
    }


    console.log(data2);
    articles.map((item, index) => {
      console.log(item.title + "-" + item.description+ "-" + item.path+ "-" + item.publishedDate+ "-" + item.siteId+ "-" + item.id);
    })
    
  }
*/



  const getNewsArticles = ():void => {
    const articles = [
      {
        id:1,
        title: "New Environmental Policy Announced",
        description: "The government has introduced a new policy aimed at reducing carbon emissions by 50% by 2030.",
        author: "Jane Doe",
        publishedDate: "2024-08-01"
      },
      {
        id:2,
        title: "Tech Giants Release Latest Smartphones",
        description: "Several major tech companies have unveiled their newest smartphones, featuring cutting-edge technology and innovative designs.",
        author: "John Smith",
        publishedDate: "2024-08-05"
      },
      {
        id:3,
        title: "Global Markets Experience Volatility",
        description: "Stock markets around the world have seen significant fluctuations due to ongoing economic uncertainties.",
        author: "Alice Johnson",
        publishedDate: "2024-08-08"
      },
      {
        id:4,
        title: "Breakthrough in Cancer Research",
        description: "Scientists have made a significant breakthrough in cancer research, potentially leading to more effective treatments.",
        author: "Michael Brown",
        publishedDate: "2024-08-10"
      },
      {
        id:5,
        title: "Breakthrough in Cancer Research",
        description: "Scientists have made a significant breakthrough in cancer research, potentially leading to more effective treatments.",
        author: "Michael Brown",
        publishedDate: "2024-08-10"
      },
      {
        id:6,
        title: "Breakthrough in Cancer Research",
        description: "Scientists have made a significant breakthrough in cancer research, potentially leading to more effective treatments.",
        author: "Michael Brown",
        publishedDate: "2024-08-10"
      }
    ];

    setArticles(articles);
  };

  useEffect(() => {
    getNewsArticles();
  }, []);

  const _onRenderGridItem = (item: Article, finalSize: ISize, isCompact: boolean): JSX.Element => {
    return (
      <div data-is-focusable={true} role="listitem" aria-label={item.title}>
        <div className={"MainNewsItem"} style={{ backgroundColor: "grey", height: "100px" }}>
          {item.title}
        </div>
      </div>
    );
  };

  return (
    <>
      <GridLayout
        ariaLabel="List of content, use right and left arrow keys to navigate, arrow down to access details."
        items={newsArticles}
        onRenderGridItem={_onRenderGridItem}
      />
    </>
  );
};

export default TestGridLayout2;
