import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { Tabs, tabsClasses, ThemeProvider } from '@mui/material';
import createCustomTheme from '../styles/CustomSelectDropdownTheme';

export default function ScrollableTabsButton(props) {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabsData = props.data || [];

  const themeProps = {
    scrollbarThumbTabs: `${props.scrollbarThumb2} `,
  };

  const theme = createCustomTheme(themeProps);


  return (
    <ThemeProvider theme={theme}>
      <TabContext value={value}>
        <Box className="tabs_container">
          <Tabs value={value} onChange={handleChange} variant="scrollable" className="tabs" scrollButtons  sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            '&.Mui-disabled': { opacity: 0.3 },
          },
        }}>
          {props.data.map((tab)=>(
            <Tab label={tab.name} value={`${tab.id}`} key={tab.id}/>
          ))}
          </Tabs>
        </Box>
        {tabsData.map((tab) => (
          <TabPanel key={tab.id} value={`${tab.id}`} className="tab_panel">
            {tab.content}
          </TabPanel>
        ))}
      </TabContext>
    </ThemeProvider>
  );
}
