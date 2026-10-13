import { useEffect, useRef } from 'react';
import { projectById } from '../data/projects';
import { closeCaseStudy, openCaseStudy } from '../store/slices/uiSlice';
import { useAppDispatch, useAppSelector } from './useAppDispatch';

const PARAM = 'project';

/**
 * Keeps ?project=<id> in the address bar in sync with the open case study, so
 * a case study can be shared as a link and the Back button closes it.
 */
export function useCaseStudyUrl() {
  const id = useAppSelector((s) => s.ui.caseStudyId);
  const dispatch = useAppDispatch();
  const fromHistory = useRef(false);
  const prev = useRef(null);
  const current = useRef(id);
  current.current = id;

  useEffect(() => {
    const sync = () => {
      const param = new URLSearchParams(window.location.search).get(PARAM);
      const target = param && projectById[param] ? param : null;
      if (target === current.current) return;
      fromHistory.current = true;
      dispatch(target ? openCaseStudy(target) : closeCaseStudy());
    };
    sync();
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, [dispatch]);

  useEffect(() => {
    const was = prev.current;
    if (was === id) return; // mount, or nothing changed
    prev.current = id;
    if (fromHistory.current) {
      fromHistory.current = false;
      return;
    }
    const url = new URL(window.location.href);
    if (id) {
      url.searchParams.set(PARAM, id);
      if (was) window.history.replaceState({ caseStudy: id }, '', url);
      else window.history.pushState({ caseStudy: id }, '', url);
    } else if (was) {
      if (window.history.state?.caseStudy) window.history.back();
      else {
        url.searchParams.delete(PARAM);
        window.history.replaceState(null, '', url);
      }
    }
  }, [id]);
}
