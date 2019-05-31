class LoadJSON {

    // No constructor/css/etc., only a static load function
    static load(url) {
        return fetch(url)
            .then(response => response.json()) // Convert to JSON
            .then((data) => {
                return data; // Return loaded data
            })
            .catch((err) => {
                return err; // Return error if applicable
            });
    }
}
export default LoadJSON;
