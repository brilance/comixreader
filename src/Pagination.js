export default function Pagination({currentId, maxId, action}) {
    const pages = [];
    if (currentId > 3 && currentId < maxId-3) {
        for (let x = currentId-3; x <= currentId+3; x++) {
            pages.push(x);
        }
    } else if (currentId <=3) {
        for (let x = 1; x <= 7; x++) {
            pages.push(x);
        }
    } else if (currentId >= maxId-3) {
        for (let x = maxId-6; x <= maxId; x++) {
            pages.push(x);
        }
    }
    return pages.map((page) => {
        if (page === currentId) {
            return <span key={page} className="pageLink current">{page}</span>;
        }
        return <span key={page} className="pageLink" onClick={() => action(page)}>{page}</span>;
    });
}