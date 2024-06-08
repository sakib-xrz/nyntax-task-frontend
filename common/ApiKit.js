import client from "./HttpKit";

const ApiKit = {
  getCars: () => {
    const url = "/cars";
    return client.get(url);
  },

  postInvoice: (payload) => {
    const url = "/invoices";
    return client.post(url, payload);
  },
};

export default ApiKit;
