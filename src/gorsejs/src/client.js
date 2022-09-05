import axios from "axios";
import { requestLogger, responseLogger, errorLogger, setGlobalConfig, } from "axios-logger";
import { deleteFeedback, getFeedback, getFeedbacks, getFeedbacksByType, insertFeedbacks, upsertFeedbacks, } from "./model/feedback";
import { deleteItem, deleteItemCategory, getItem, upsertItem, insertItemCategory, upsertItems, updateItem, getItems, getItemNeighbors, } from "./model/item";
import { deleteUser, getUser, getUserNeighbors, getUsers, insertUser, insertUsers, updateUser, } from "./model/user";
import { getLatest, getPopular, getRecommend } from "./model/recommend";
class Gorse {
    axiosClient;
    constructor({ endpoint = `${process.env["GORSE_ENDPOINT"]}`, secret = `${process.env["GORSE_SECRET"]}`, debug, }, axiosOptons) {
        this.axiosClient = axios.create({
            baseURL: `${endpoint}/api`,
            headers: secret && secret.length > 0 ? { "X-API-Key": secret } : {},
            ...axiosOptons,
        });
        if (debug) {
            setGlobalConfig({
                prefixText: "Gorse",
                status: true,
                headers: true,
            });
            this.axiosClient.interceptors.request.use(requestLogger, errorLogger);
            this.axiosClient.interceptors.response.use(responseLogger, errorLogger);
        }
    }
    // Core functions
    getPopular(options) {
        return getPopular(this.axiosClient, options);
    }
    getLatest(options) {
        return getLatest(this.axiosClient, options);
    }
    getRecommend(options) {
        return getRecommend(this.axiosClient, options);
    }
    // Feedback
    getFeedback(filter, options) {
        return getFeedback(this.axiosClient, { ...filter, cursorOptions: options });
    }
    deleteFeedback(filter) {
        return deleteFeedback(this.axiosClient, filter);
    }
    getFeedbacks(type, options) {
        if (type) {
            return getFeedbacksByType(this.axiosClient, {
                type,
                cursorOptions: options,
            });
        }
        else {
            return getFeedbacks(this.axiosClient, options);
        }
    }
    insertFeedbacks(feedbacksList) {
        return insertFeedbacks(this.axiosClient, feedbacksList);
    }
    upsertFeedbacks(feedbacksList) {
        return upsertFeedbacks(this.axiosClient, feedbacksList);
    }
    // Item
    upsertItem(data) {
        return upsertItem(this.axiosClient, data);
    }
    getItem(id) {
        return getItem(this.axiosClient, id);
    }
    deleteItem(id) {
        return deleteItem(this.axiosClient, id);
    }
    updateItem(id, data) {
        return updateItem(this.axiosClient, id, data);
    }
    insertItemCategory(id, category) {
        return insertItemCategory(this.axiosClient, id, category);
    }
    deleteItemCategory(id, category) {
        return deleteItemCategory(this.axiosClient, id, category);
    }
    getItems(options) {
        return getItems(this.axiosClient, options);
    }
    upsertItems(users) {
        return upsertItems(this.axiosClient, users);
    }
    getItemNeighbors(options) {
        return getItemNeighbors(this.axiosClient, options);
    }
    // User
    insertUser(userData) {
        return insertUser(this.axiosClient, userData);
    }
    getUser(userId) {
        return getUser(this.axiosClient, userId);
    }
    deleteUser(userId) {
        return deleteUser(this.axiosClient, userId);
    }
    updateUser(userId, userData) {
        return updateUser(this.axiosClient, userId, userData);
    }
    getUsers(options) {
        return getUsers(this.axiosClient, options);
    }
    insertUsers(users) {
        return insertUsers(this.axiosClient, users);
    }
    getUSerNeighbors(options) {
        return getUserNeighbors(this.axiosClient, options);
    }
}
export { Gorse };
//# sourceMappingURL=client.js.map