import React from 'react';
import { createUseStyles } from 'react-jss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LayoutProvider } from '../contexts';
import { Nav } from '../components';
import { ApolloProvider } from '@apollo/client';
import { client } from './client';
import { ListPage, Home } from '../screens';
import { constants } from 'os';

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <ApolloProvider client={client}>
      <LayoutProvider>
        <div className={classes.root}>
          <BrowserRouter>
            <Nav />
            <div className={classes.content}>
              <div className={classes.scrollableArea}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/pokemon" element={<ListPage />} />
                  <Route path="/pokemon?id=:id&name=:name" element={<ListPage />} />
                </Routes>
              </div>
            </div>
          </BrowserRouter>
        </div>
      </LayoutProvider>
    </ApolloProvider>
  );
}

const useStyles = createUseStyles({
    "@global": {
      "*": {
        color: "rgba(255,255,255,.92)",
        "font-family": "Roboto"
      },
      ".material-icons": {
        color: "#7C89A3"
      },
      button: {
        padding: "8px 12px",
        border: "none",
        "box-shadow": "none"
      },
      body: {
        background: "#171E2b",
        margin: "0",
        "font-family": "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans- serif",
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale",
        "scrollbar-width": "thin",
        "scrollbar-color": "#4B5066 #171E2b"
      },
      code: {
        "font-family": "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace"
      },
      "::-webkit-scrollbar": {
        width: "16px"
      },
      "::-webkit-scrollbar-track": {
        background: "#171E2b"
      },
      "::-webkit-scrollbar-thumb": {
        "background-color": "#4B5066",
        "border-radius": "4px",
        border: "5px solid #171E2b"
      },
      "::-webkit-scrollbar-corner": {
        background: "rgba(0,0,0,0)"
      }
    },
    root: {
      background: '#171E2b',
      minHeight: '100vh',
      minWidth: '100vw',
      height: '100%',
      width: '100%',
      display: 'flex',
    },
    content: {
      flex: '1',
      overflow: 'hidden',
      position: 'relative',
    },
    scrollableArea: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'auto',
    },
  },
  { name: 'App' },
);

export default App;
