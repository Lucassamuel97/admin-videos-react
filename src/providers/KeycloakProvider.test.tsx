import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { keycloak } from "../../KeycloackConfig";
import { KeycloakProvider } from "./KeycloakProvider";
import { authSlice } from "../features/auth/authSlice";
import type { Mocked } from 'vitest';

// @ts-ignore
import { vi, describe, it, beforeEach, expect } from "vitest";

// Mock KeycloakConfig
vi.mock("../../KeycloackConfig");

const mockKeycloak = keycloak as Mocked<typeof keycloak>;

describe("KeycloakProvider", () => {
    beforeEach(() => {
        mockKeycloak.init.mockReset();
        mockKeycloak.loadUserInfo.mockReset();
    });

    it("initializes keycloak and sets user details on successful authentication", async () => {
        mockKeycloak.init.mockResolvedValue(true);
        mockKeycloak.loadUserInfo.mockResolvedValue({
            sub: "123",
            name: "John Doe",
            email: "john.doe@example.com",
        });

        const store = configureStore({
            reducer: { auth: authSlice.reducer },
        });

        render(
            <Provider store={store}>
                <KeycloakProvider>Test</KeycloakProvider>
            </Provider>
        );

        await new Promise((resolve) => setTimeout(resolve, 0));

        expect(mockKeycloak.init).toHaveBeenCalledTimes(1);
        expect(mockKeycloak.loadUserInfo).toHaveBeenCalledTimes(1);
        expect(store.getState().auth.isAuthenticated).toBe(true);
        expect(store.getState().auth.userDetails).toEqual({
            sub: "123",
            name: "John Doe",
            email: "john.doe@example.com",
        });
    });

    it("initializes keycloak and sets isAuthenticated to false on failed authentication", async () => {
        mockKeycloak.init.mockResolvedValue(false);

        const store = configureStore({
            reducer: { auth: authSlice.reducer },
        });

        render(
            <Provider store={store}>
                <KeycloakProvider>Test</KeycloakProvider>
            </Provider>
        );

        await new Promise((resolve) => setTimeout(resolve, 0));

        expect(mockKeycloak.init).toHaveBeenCalledTimes(1);
        expect(mockKeycloak.loadUserInfo).toHaveBeenCalledTimes(0);
        expect(store.getState().auth.isAuthenticated).toBe(false);
        expect(store.getState().auth.userDetails).toBeNull();
    });

    it("initializes keycloak and sets isAuthenticated to false on error", async () => {
        const originalConsoleError = console.error;
        // @ts-ignore
        console.error = vi.fn();
        mockKeycloak.init.mockRejectedValue(new Error("Test error"));

        const store = configureStore({
            reducer: { auth: authSlice.reducer },
        });

        render(
            <Provider store={store}>
                <KeycloakProvider>Test</KeycloakProvider>
            </Provider>
        );

        await new Promise((resolve) => setTimeout(resolve, 0));

        expect(mockKeycloak.init).toHaveBeenCalledTimes(1);
        expect(mockKeycloak.loadUserInfo).toHaveBeenCalledTimes(0);
        expect(store.getState().auth.isAuthenticated).toBe(false);
        expect(store.getState().auth.userDetails).toBeNull();

        console.error = originalConsoleError;
    });

    it("updates token and dispatches setToken action when token expires", async () => {
        // @ts-ignore
        const mockUpdateToken = vi.fn().mockResolvedValue(true);
        mockKeycloak.updateToken = mockUpdateToken;

        const store = configureStore({
            reducer: { auth: authSlice.reducer },
        });

        render(
            <Provider store={store}>
                <KeycloakProvider>Test</KeycloakProvider>
            </Provider>
        );

        if (!mockKeycloak.onTokenExpired) {
            throw new Error("onTokenExpired is not defined");
        }

        mockKeycloak.onTokenExpired();

        await waitFor(() => expect(mockUpdateToken).toHaveBeenCalledTimes(1));

        expect(mockUpdateToken).toHaveBeenCalledWith(70);
        expect(store.getState().auth.token).toBe(mockKeycloak.token);
    });
});
