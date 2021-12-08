const getBaseUrl = () => {
  const url = window.location.href;
  const base = url.split("#")[0];
  const baseWithoutHttp = base.split("/")[2];
  switch (baseWithoutHttp) {
    case "192.168.0.4":
      return "http://localhost:2900";
    default:
      return "http://localhost:2900"
  }
};

const baseUrl = getBaseUrl();
export default baseUrl;
