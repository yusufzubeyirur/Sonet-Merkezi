import { useState, useRef } from "react";
import sonnetsData from "./data/sonnetsData";
import Header from "./components/Header";
import "./styles.css";
export default function App() {
  const inputRef = useRef();
  const [searchInput, setSearchInput] = useState("");

  function handleClick() {
    setSearchInput(inputRef.current.value.trim());
  }

  /* Challenge

  Kullanıcı " Arama " butonuna tıkladığında, input alanına yazdığı metin searchInput state'inin değeri olur (bu kod zaten yazılmıştı).    
 1. SonnetsData array'indeki satırlarından birinde searchInput değerini içeren her bir sonnet için "sonnets-container" div'inde className'i "sonnet" olan bir div oluşturun (satır 27). 
    
    2. "sonnet" div'inde, sonenin number özelliğini bir <h3> öğesinin metin içeriği olarak ekleyin ve ardından lines özelliğinden/dizisinden sonenin *her* satırını bir <p> öğesinin text içeriği olarak ekleyin, böylece sonenin her satırı için bir <p> elde edin. 
       
    3. "Love", "summer", "winter" ve "strange" gibi yaygın sözcüklerin yanı sıra "hello" ve "weird" gibi hiçbir sonede geçmeyen sözcükleri arayarak kodunuzu test edin.
*/

  // Arama terimi ile eşleşen sonetleri filtreleme
  const filteredSonnets = sonnetsData.filter((sonnet) =>
    sonnet.lines.some((line) =>
      line.toLowerCase().includes(searchInput.toLowerCase())
    )
  );

  function highlightText(line, searchTerm) {
    if (!searchTerm) return line; // Arama terimi boşsa, satırı olduğu gibi döndür

    // Arama terimini küçük/büyük harfe duyarsız olarak bulmak için RegExp
    const regex = new RegExp(`(${searchTerm})`, "gi");

    // Satırı terimlere göre böleriz ve eşleşen terimlerin etrafını <span> ile sararız
    const parts = line.split(regex);
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  }

  return (
    <div className="wrapper">
      <Header searchProps={{ inputRef, handleClick }} />

      <div className="sonnets-container">
        {filteredSonnets.length > 0 ? (
          filteredSonnets.map((sonnet) => (
            <div className="sonnet" key={sonnet.number}>
              <h3>{sonnet.number}</h3>
              {sonnet.lines.map((line, index) => (
                <p key={index}>{highlightText(line, searchInput)}</p>
              ))}
            </div>
          ))
        ) : (
          <p className="no-results-message">
            Ne yazık ki, araman sonucunda hiçbir şey bulamadın.
          </p>
        )}
      </div>
    </div>
  );
}
/*Bonus Challenges
      
    - Arama sonucu yoksa, "sonnets-container" div'inde "Ne yazık ki, araman sonucunda hiçbir şey bulamadın." yazan bir <p> öğesi oluşturun. <p> öğesine "no-results-message" şeklinde bir className verin. 
      
    - Sonuçlar varsa, sonedeki searchInput değeriyle eşleşen her kelimenin etrafına bir <span> koyun. Böylece kelime otomatik olarak vurgulanacaktır (CSS zaten ayarlanmıştır). 
*/
