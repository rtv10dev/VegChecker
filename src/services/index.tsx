const basePath = "https://world.openfoodfacts.net/api/v3";

export const getProductInfo = async (productCode: string): Promise<any> => {
  const resp = await fetch(
    `${basePath}/product/${productCode}?fields=ingredients_analysis,ingredients_analysis_tags,product_name,`
  );

  const data = await resp.json();

  return data;
};
