export async function getResourcesInfoServer(slug: string) {
  try {
    const response = await fetch(`${process.env.API_URL}resources/test/${slug}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-API-Key": process.env.API_KEY ?? "",
        Authorization: `Basic ${Buffer.from(
          `${process.env.AUTH_USER}:${process.env.AUTH_PASSWORD}`
        ).toString("base64")}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch resource info (status: ${response.status})`);
    }

    const responseData = await response.json();
    return {
      resourceInfo: responseData?.response ?? null,
      isLoading: false,
      isError: false,
      isSuccess: true,
    };
  } catch (error) {
    console.error("Error fetching resource info:", error);
    return {
      resourceInfo: null,
      isLoading: false,
      isError: true,
      isSuccess: false,
    };
  }
}
