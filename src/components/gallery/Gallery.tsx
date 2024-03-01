import { UseSearch } from "../../context/Searchcontext";
import { Photo } from "../../interfaces/GalleryTypes";

export default function Gallery() {
  const { filteredData } = UseSearch();
  return (
    <div>
      {filteredData && filteredData.length > 0 ? (
        filteredData.map((photo: Photo) => (
          <img key={photo.id} src={photo.urls.small} alt="" />
        ))
      ) : (
        <p style={{ color: "#ffff" }}>No results found.</p>
      )}
    </div>
  );
}
