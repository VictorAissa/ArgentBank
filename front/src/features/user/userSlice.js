import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: "void",
    data: null,
    error: null,
};

/**
 * Fonction unique permettant les requêtes concernant les utilisateurs; actualise les valeurs du state,
 * stocke le jwt dans localStorage et renvoie le message de la réponse en cas de succès de la requête
 *
 * @param {Object} params - Contient 4 clés : url, method, token, userParams, et les valeurs associées (undefined si valeur inutile).
 * @returns {String} Message de succès de la requête le cas échéant.
 */
export function fetchUser(params) {
    return async (dispatch, getState) => {
        const status = selectUser(getState()).status;
        if (status === "pending" || status === "updating") {
            return;
        }
        dispatch(fetching());
        try {
            const response = await fetch(params.url, {
                method: params.method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + params.token,
                },
                body: JSON.stringify(params.userParams),
            });
            const data = await response.json();
            if (data.status === 400 || data.status === 401) {
                dispatch(rejected(data.message));
                return;
            }
            if (data.body.token) {
                localStorage.setItem("jwt", data.body.token);
            }
            dispatch(resolved(data));
            return data.message;
        } catch (error) {
            dispatch(rejected("Erreur réseau"));
        }
    };
}

// Slice des utilisateurs definissant 4 actions qui gèrent la mise à jour du statut, de l'erreur
// et des données du state ainsi que leurs reducers
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        fetching: (draft) => {
            if (draft.status === "void") {
                draft.status = "pending";
                return;
            }
            if (draft.status === "rejected") {
                draft.error = null;
                draft.status = "pending";
                return;
            }
            if (draft.status === "resolved") {
                draft.status = "updating";
                return;
            }
            return;
        },
        resolved: (draft, action) => {
            if (draft.status === "pending" || draft.status === "updating") {
                if (action.payload.message === "User successfully logged in") {
                    draft.status = "resolved";
                    return;
                }
                draft.data = action.payload.body;
                draft.status = "resolved";
                return;
            }
            return;
        },
        rejected: (draft, action) => {
            if (draft.status === "pending" || draft.status === "updating") {
                draft.error = action.payload;
                draft.data = null;
                draft.status = "rejected";
                return;
            }
            return;
        },
        eraseData: (draft) => {
            draft.status = "void";
            draft.data = null;
            draft.error = null;
            return;
        },
    },
});

export const { fetching, resolved, rejected, eraseData } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
