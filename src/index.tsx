import {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from 'state/store';
import App from 'App';

import 'index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
