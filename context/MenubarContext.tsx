'use client';
import React, {createContext, useContext, useState} from 'react';

type MenubarContextType = {
    collapsed: boolean;
    updateMenubarData: (newData: boolean) => void;
};

const MenubarContext = createContext<MenubarContextType | undefined>(undefined);

export function MenubarProvider({children}: {children: React.ReactNode}) {
    const [collapsed, setCollapsed] = useState(false);

    const updateMenubarData = (newData: boolean) => {
        setCollapsed(newData);
    };

    return (
        <MenubarContext.Provider
            value={{
                collapsed,
                updateMenubarData,
            }}
        >
            {children}
        </MenubarContext.Provider>
    );
}

export function useMenubarData() {
    const context = useContext(MenubarContext);
    if (context === undefined) {
        throw new Error('useMenubarData must be used within a MenubarProvider');
    }
    return context;
}
