import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from './BreakingNews.module.scss';
import type { IBreakingNewsProps } from './IBreakingNewsProps';
import { Stack, Text,Icon } from '@fluentui/react';
//import { mergeStyles } from '@fluentui/react';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { AddNewsContextMenu } from './AddNewsContextMenu';
import { BreakingNewsDialog } from './BreakingNewsDialog';

const BreakingNews: React.FC<IBreakingNewsProps> = (props) => {
  type Article = {
    id:number;
    title: string;
    description: string;
    author: string;
    publishedDate: string;
  };
  
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [newsArticles, setArticles] = useState<Article[]>([]);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const showDialog = ():void => {
    setIsDialogVisible(true);
  };
  const handleSelectedNewsOption = (selectedValue: string) :void=> {
    if (selectedValue === "ABN") {
      showDialog();
    } else if (selectedValue === "DPRT") {
      console.log("DPRT case");
    } else if (selectedValue === "SEA") {
      console.log("SEA case");
    } else {
      console.log("Other case");
    }
    console.log(selectedValue);
  };

  const getNewsArticles=():void=>
  {
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
      }
    ];

    setArticles(articles);

  }
  const handlePinClick = (id: number):void => {
    console.log(`Article with ID ${id} pinned.`);
    const pinnedArticle = newsArticles.filter(article => article.id === id);
    const updatedArticles = newsArticles.filter(article => article.id !== id);
    setArticles(updatedArticles);
    console.log(pinnedArticle);
    // Handle the pinning logic here
  };
  useEffect(() => {
    const handleResize = ():void => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    getNewsArticles();
    return () => window.removeEventListener('resize', handleResize);
    
  }, []);

 /* const divStyle = mergeStyles({
    backgroundColor: 'black',
    //padding: '10px',
    margin: '5px',
    textAlign: 'center',
    //boxShadow: '0 1.6px 3.6px rgba(0,0,0,.2)',
    border: '1px solid rgb(229, 229, 229)',
    height: '50px'
  });*/
  


  const hideDialog = ():void => {
    setIsDialogVisible(false);
    window.location.reload(); // Refresh the page when the dialog is closed
  };
  return (
    <>
      <BreakingNewsDialog isVisible={isDialogVisible} onDismiss={hideDialog} context={props.context} />
      <WebPartTitle displayMode={props.displayMode}
        title={props.title}
        updateProperty={props.updateProperty} />
      <Stack horizontal={!isMobile}
        tokens={{ childrenGap: isMobile ? 0 : 5 }}
        styles={{ root: { width: '100%'} }}>
        <Stack.Item grow className={styles.highlightedContent}>
          <AddNewsContextMenu getSelectedValue={handleSelectedNewsOption}/>
        </Stack.Item>
        <Stack.Item grow className={styles.latestNews} >
          <div style={{ float: 'right' }}>See All Breaking News</div>
        </Stack.Item>
      </Stack>

      <Stack
        horizontal={!isMobile}
        tokens={{ childrenGap: isMobile ? 0 : 5 }}
        styles={{ root: { width: '100%' } }}
      >
        <Stack.Item grow className={styles.highlightedContent}>
          <div className={styles.divStyle}>Pinned Content</div>
        </Stack.Item>
        <Stack.Item grow className={styles.latestNews}>
          <div className={styles.divStyle}>
            <Stack tokens={{ childrenGap: 5 }} styles={{ root: { width: '100%' } }}>


            {newsArticles.map((article:Article, index:number) => (
  <Stack 
    key={index} 
    tokens={{ childrenGap: 0 }} 
    styles={{ root: { 
      border: '1px solid #ccc', 
      padding: '0px', 
      backgroundColor:'white', 
      position: 'relative',
      ':hover': {
        selectors: {
          '.pinIcon': { 
            opacity: 1 
          }
        }
      } 
    } }}
  >
    <Icon 
      iconName="Pinned" 
      className="pinIcon" 
      styles={{ 
        root: { 
          position: 'absolute', 
          top: 5, 
          right: 5, 
          opacity: 0, 
          color:'blue',
          transition: 'opacity 0.2s ease-in-out', 
          cursor: 'pointer' 
        } 
      }} 
      onClick={() => handlePinClick(article.id)}
     
    />
    <Text variant="xLarge" styles={{ root: { textAlign: 'left' } }}>
      {article.title}
    </Text>
    <Text styles={{ root: { textAlign: 'left' } }}>
      {article.description}
    </Text>
    <Stack
      horizontal={!isMobile}
      tokens={{ childrenGap: 10 }}
      styles={{ root: { width: '100%', textAlign: 'left' } }}
    >
      <Text styles={{ root: { textAlign: 'left', width: isMobile ? '100%' : '50%' } }}>
        {article.author}
      </Text>
      <Text styles={{ root: { textAlign: isMobile ? 'left' : 'right', width: isMobile ? '100%' : '50%', margin: '0 !important' } }}>
        {article.publishedDate}
      </Text>
    </Stack>
  </Stack>
))}

              
            </Stack>
          </div>
        </Stack.Item>
      </Stack>
    </>
  );
};

export default BreakingNews;
