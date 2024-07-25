export function GET() {
  try {
    return new Response(
      JSON.stringify({ message: "You have reached the API endpoint" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
    });
  }
}
