import { useLocation } from 'react-router-dom';
import { useCallback, useMemo } from 'react';

/**
 * Hook for managing active navigation state and utilities
 * @param {Array<{path: string, name: string}>} [navItems=[]] - Array of navigation items
 * @returns {Object} Navigation utilities
 * @returns {string} currentNavPath - Current URL pathname
 * @returns {function} isActiveNav - Checks if target name matches active navigation item
 * @returns {function} hasActiveNav - Checks if any navigation item is active
 * @returns {function} activeNavName - Name of the active navigation item
 * @returns {Object|null} activeNav - The active navigation item or null
 */
export const useActiveNav = ( navItems = [] ) => {
    const { pathname: currentNavPath } = useLocation();

    // Find active path based on current location
    const activeNav = useMemo( () =>
        navItems.find( item => item.path === currentNavPath ),
        [ navItems, currentNavPath ]
    );

    /**
     * Checks if any navigation path is currently active
     * @returns {boolean} True if any path is active
     */
    const hasActiveNav = useCallback( () => !!activeNav, [ activeNav ] );

    /**
     * Checks if the target path name matches the active navigation path
     * @param {string} targetPath - Path name to check against active path
     * @returns {boolean} True if target path matches active path name
     */
    const isActiveNav = useCallback( ( targetPath = "" ) => {
        if ( !targetPath || typeof targetPath !== 'string' ) return false;
        if ( !activeNav || !activeNav.name ) return false;

        return activeNav.name.toLowerCase() === targetPath.toLowerCase();
    }, [ activeNav ] ); // Only need activeNav here

    /**
     * Returns the name of the currently active path
     * @returns {string|null} Active path name or null
     */
    const getActiveNavName = useCallback( () => activeNav?.name, [ activeNav ] );

    return {
        currentNavPath,
        isActiveNav,
        hasActiveNav,
        getActiveNavName,
        activeNav
    };
};