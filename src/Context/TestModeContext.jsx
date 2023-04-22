import { createContext, useContext, useState } from "react";

const TextModeContext = createContext();

export const TextModeContextProvider = ({ children }) => {
    const [testTime, settestTime] = useState(15);
    const values = {
        testTime,
        settestTime
    }

    return (
        <TextModeContext.Provider value={values}>{children}</TextModeContext.Provider>
    )
}

export const useTestMode = () => useContext(TextModeContext);