import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ChevronLeft, ChevronRight, Plus, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

import flashcardService from '../../services/flashcardService'
import aiService from '../../services/aiService'
import PageHeader from '../../components/common/PageHeader'
import Spinner from '../../components/common/Spinner'
import EmptyState from '../../components/common/EmptyState'
import Button from '../../components/common/Button'
import Modal from '../../components/common/Modal'
import Flashcard from '../../components/flashcards/Flashcard'

const FlashcardPage = () => {

  const { id: documentId } = useParams();
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchFlashcards = async () => {

    setLoading(true);

    try {

      const response = await flashcardService.getFlashcardForDocument(documentId);

      setFlashcardSets(response.data[0]);
      setFlashcards(response.data[0]?.cards || []);

    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch flashcards.')
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    fetchFlashcards();
  }, [documentId]);

  const handleGenerateFlashcards = async () => {
    setGenerating(true);

      try { 
        await aiService.generateFlashcards(documentId);
        toast.success('Flashcards generated successfully.')
        fetchFlashcards();
      } catch (error) {
        console.error(error);
        toast.error( error.message || 'Failed to generate flashcards.')
      } finally {
        setGenerating(false)
      }

  };

  const handleNextCard = () => {
    handleReview(currentCardIndex);
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePreCard = () => {
    handleReview(currentCardIndex);
    setCurrentCardIndex(
      (prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length
    );
  };

  const handleReview = async (index) => {

    const currentCard = flashcards[currentCardIndex];

    if(!currentCard) return;

    try {

      await flashcardService.reviewFlashcard(currentCard._id, index);
      toast.success('Flashcard reviewed.')

    } catch (error) {
      console.error(error);
      toast.error('Failed to view flashcard.')
    } 

  };

  const handleDeleteFlashcardSet = async () => {
    setDeleting(true);
    try {

      await flashcardService.deleteFlashcard(flashcardSets._id);
      toast.success('Flashcard set deleted successfully');
      setIsDeleteModalOpen(false);
      fetchFlashcards();

    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Failed to delete flashcard set.');
    } finally {
      setDeleting(false);
    }
  }

  const renderFlashcardContent = () => {
    if(loading){
      return <Spinner />
    }

    const currentCard = flashcards[currentCardIndex];

    return (
      <div className="flex flex-col items-center space-y-6">
        <div className="w-full max-w-4xl ">
          <Flashcard flashcard={currentCard} />
        </div>
        <div className="flex items-center gap-4">
          <Button
            onClick={handlePreCard}
            variant='secondary'
            disabled={flashcards.length <= 1}
          >
            <ChevronLeft size={16} /> Previous
          </Button>
          <span className="text-sm text-neutral-600">{ currentCardIndex + 1 } / { flashcards.length }</span>
          <Button
            onClick={handleNextCard}
            variant='secondary'
            disabled={flashcards.length <= 1}
          >
            Next
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    )

  }

  return (
    <div>
      <div className="mb-4">
        <Link to={`/documents/${documentId}`} className='inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors' >
          <ArrowLeft size={16} />
          Go to Documents 
        </Link>
      </div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-medium text-slate-900 tracking-tight mb-2">Flashcards</h1>
    </div>

      {renderFlashcardContent()}

    </div>
  )
}

export default FlashcardPage