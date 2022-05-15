import { put } from "redux-saga/effects";
import { errorActions } from "../../slices/errorSlice";

export function* handleClearError() {
    yield put(errorActions.clearError())
}