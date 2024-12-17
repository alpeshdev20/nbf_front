import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
// Containers
import Highlight from '../../containers/menu/commons/Highlight';
// Components
import Wrapper from '../../components/sideMenu/Wrapper';
import LearningLayout from '../../components/note/Layout';
import MenuEmpty from '../../components/sideMenu/MenuEmpty';
// Types
import { RootState } from '../../slices';
import HighlightType from '../../types/highlight';
import { pushHighlight, popHighlight, updateHighlight } from '../../slices/book';
import { newSnackbar } from '../../slices/snackbar';
import { MenuControl } from '../../lib/hooks/useMenu';

const Note = ({ 
  control, 
  onToggle, 
  onClickHighlight, 
  emitEvent,
  viewerRef,
}: Props, ref: any) => {
  const dispatch = useDispatch();
  const highlights = useSelector<RootState, HighlightType[]>(state => state.book.highlights);
  const [highlightList, setHighlightList] = useState<any[]>([]);


  /** Set Highlight Contents */
  useEffect(() => {
    const Items = highlights.map(h => (
      <Highlight 
        key={h.key} 
        highlight={h}
        onClick={onClickHighlight} 
        emitEvent={emitEvent}
        viewerRef={viewerRef} 
      />
    ));
    setHighlightList(Items); 
  }, [viewerRef, highlights, onClickHighlight, emitEvent]);

  /** Add Highlight */
  const onAddHighlight = useCallback(async (highlightData: any) => {
    try {
      const response = await axios.post(`${process.env.API_URL}highlights-epub/add`, highlightData);
      if (response.data.success) {
        dispatch(pushHighlight(response.data.highlight));
        // dispatch(newSnackbar({ text: 'Highlight added successfully!', type: 'SUCCESS' }));
      }
    } catch (error) {
      console.error('Error adding highlight:', error);
    }
  }, [dispatch]);

  return (
    <>
      {control.display && (
        <Wrapper 
          title="Highlight"
          show={control.open}
          onClose={onToggle}
          ref={ref}
        >
          <LearningLayout>
            {highlightList.length > 0 ? highlightList : <MenuEmpty text="Empty highlights!" />}
          </LearningLayout>
        </Wrapper>
      )}
    </>
  );
};

interface Props {
  control: MenuControl;
  onToggle: () => void;
  onClickHighlight: (highlightNode: any) => void;
  emitEvent: () => void;
  viewerRef: any;
  // bookId: string;
  // userIdMain: string;
}

export default React.forwardRef(Note);
