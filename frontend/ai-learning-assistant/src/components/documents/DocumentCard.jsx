import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, BrainCircuit, Clock, FileText, Trash2 } from 'lucide-react'
import moment from 'moment'

// Helper function to format file size
const formatFileSize =(bytes) => {
    if(bytes === undefined || bytes === null) return 'N/A';
    
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1){
        size /= 1024;
        unitIndex++;
    }

    return `${size.toFixed(1)} ${units[unitIndex]}`;

}

const DocumentCard = ({
    document, onDelete
}) => {

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/documents/${document._id}`);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        onDelete(document);
    }

  return (
    <div className="group relative bg-white/80 backdrop-blur-xl border border-slate-200" onClick={handleNavigate}>
        {/* Header Section */}
        <div>

            <div className="">
                <div className="">
                    <FileText className='' strokeWidth={2} />
                </div>
                <button className="" onClick={handleDelete}>
                    <Trash2 className='' />
                </button>
            </div>

            {/* Title */}
            <h3 className="" title={document.title}>{document.title}</h3>

            {/* Document Info */}
            <div className="">
                {document.fileSize !== undefined && (
                    <>
                        <span className="">{formatFileSize(document.fileSize)}</span>
                    </>
                )}
            </div>

            {/* Stats Section */}
            <div className="">
                {document.flashcardCount !== undefined && (
                    <div className="">
                        <BookOpen className='' strokeWidth={2} />
                    </div>
                )}
                {document.quizCount !== undefined && (
                    <div className="">
                        <BrainCircuit className='' strokeWidth={2} />
                        <span className="">{document.quizCount} Quizzes</span>
                    </div>
                )}
            </div>

        </div>

        {/* Footer Section */}
        <div className="">
            <div className="">
                <Clock className='' strokeWidth={2} />
                <span>Uploaded { moment(document.createdAt).fromNow()}</span>
            </div>
        </div>

        {/* Hover Indicator */}
        <div className='' />

    </div>
  )
}

export default DocumentCard