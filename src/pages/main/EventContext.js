import React, { createContext, useState, useContext } from 'react';

// Create a Context for the event
const EventContext = createContext();
debugger
// A custom hook to use the event context
export const useEventContext = () => {
    debugger
  return useContext(EventContext);
};

// Provider component to wrap around the app and provide context
export const EventProvider = ({ children }) => {
  const [triggerLogin, setTriggerLogin] = useState(false); // State to trigger the login event

  const triggerLoginEvent = () => {
    setTriggerLogin(true); // Trigger the login event
  };

  const resetLoginEvent = () => {
    setTriggerLogin(false); // Reset the login trigger
  };

  return (
    <EventContext.Provider value={{ triggerLogin, triggerLoginEvent, resetLoginEvent }}>
      {children}
    </EventContext.Provider>
  );
};
