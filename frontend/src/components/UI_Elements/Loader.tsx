// W3schools loader lol
// feel free to add actual styling i mean i think it looks fine but idk what to do for dark mode
export default function Loader() {
  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>

      <div
        style={{
          border: "12px solid #adadad",
          borderTop: "12px solid #009966",
          borderRadius: "50%",
          width: "80px",
          height: "80px",
          animation: "spin 2s linear infinite",
        }}
      />
    </>
  );
}
