// Network request debugging helper
// Save this as a separate file and import in sign-up page for debugging

import { useEffect } from 'react';

export function useNetworkDebugger() {
  useEffect(() => {
    // Create a proxy for the fetch function to log all requests
    const originalFetch = window.fetch;
    window.fetch = async function(url, options) {
      // Get the request body if available
      let body = options?.body;
      
      try {
        // Pretty-print JSON body for logging
        if (body && typeof body === 'string' && body.startsWith('{')) {
          body = JSON.parse(body);
        }
      } catch (e) {
        // Ignore parsing errors
      }
      
      console.log(`🌐 Network Request: ${options?.method || 'GET'} ${url}`);
      console.log('🚀 Request Options:', { 
        headers: options?.headers, 
        body 
      });
      
      // Execute the original fetch and log the response
      try {
        const response = await originalFetch(url, options);
        
        // Clone the response to read the body
        const clone = response.clone();
        
        // Try to parse the response as JSON
        let responseBody;
        try {
          responseBody = await clone.json();
          console.log(`✅ Response ${response.status}:`, responseBody);
        } catch (e) {
          console.log(`✅ Response ${response.status}: [not JSON]`);
        }
        
        return response;
      } catch (error) {
        console.error('❌ Network Error:', error);
        throw error;
      }
    };
    
    // Create a proxy for XMLHttpRequest to log all requests
    const originalXHR = window.XMLHttpRequest;
    window.XMLHttpRequest = function() {
      const xhr = new originalXHR();
      const originalOpen = xhr.open;
      const originalSend = xhr.send;
      
      xhr.open = function(...args) {
        console.log(`🌐 XHR Open: ${args[0]} ${args[1]}`);
        return originalOpen.apply(this, args);
      };
      
      xhr.send = function(body) {
        try {
          if (body && typeof body === 'string' && body.startsWith('{')) {
            console.log('🚀 XHR Request Body:', JSON.parse(body));
          } else if (body) {
            console.log('🚀 XHR Request Body:', body);
          }
        } catch (e) {
          // Ignore parsing errors
        }
        
        xhr.addEventListener('load', function() {
          console.log(`✅ XHR Response ${xhr.status}:`, xhr.responseText);
        });
        
        xhr.addEventListener('error', function() {
          console.error('❌ XHR Error:', xhr.status);
        });
        
        return originalSend.apply(this, arguments);
      };
      
      return xhr;
    };
    
    // Log axios requests if available
    if (window.axios) {
      const originalAxios = window.axios;
      
      originalAxios.interceptors.request.use(config => {
        console.log('🌐 Axios Request:', config.method, config.url);
        console.log('🚀 Axios Request Data:', config.data);
        return config;
      });
      
      originalAxios.interceptors.response.use(
        response => {
          console.log(`✅ Axios Response ${response.status}:`, response.data);
          return response;
        },
        error => {
          console.error('❌ Axios Error:', error.response?.data || error.message);
          return Promise.reject(error);
        }
      );
    }
    
    console.log('🔍 Network debugger installed');
    
    // Cleanup function
    return () => {
      window.fetch = originalFetch;
      window.XMLHttpRequest = originalXHR;
      console.log('🧹 Network debugger removed');
    };
  }, []);
}
