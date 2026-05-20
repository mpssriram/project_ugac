import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Particles from './Particles';
import Header from './components/Header';
import Footer from './components/Footer';
import { addAnnouncement, getAnnouncements, getContent } from './api';
import AnnouncementsPage from './pages/AnnouncementsPage';
import ContactsPage from './pages/ContactsPage';
import HomePage from './pages/HomePage';
import TopicsPage from './pages/TopicsPage';
import TopicPage from './pages/TopicPage';

const App = () => {
    const [content, setContent] = useState(null);
    const [announcements, setAnnouncements] = useState([]);
    const [error, setError] = useState('');
    const [uiFlags, setUiFlags] = useState({ smallScreen: false, reducedMotion: false });

    useEffect(() => {
        const mqSmall = window.matchMedia('(max-width: 768px)');
        const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');

        const update = () => {
            setUiFlags({ smallScreen: mqSmall.matches, reducedMotion: mqReduce.matches });
        };

        update();
        mqSmall.addEventListener?.('change', update);
        mqReduce.addEventListener?.('change', update);
        return () => {
            mqSmall.removeEventListener?.('change', update);
            mqReduce.removeEventListener?.('change', update);
        };
    }, []);

    const showParticles = useMemo(() => !uiFlags.smallScreen && !uiFlags.reducedMotion, [uiFlags]);

    useEffect(() => {
        Promise.all([getContent(), getAnnouncements()])
            .then(([c, items]) => {
                setContent(c);
                setAnnouncements(Array.isArray(items) ? items : []);
            })
            .catch(() => setError('Backend not reachable. Start the PythonBackend on port 5000.'));
    }, []);

    const onAddAnnouncement = async (payload) => {
        setError('');
        try {
            const data = await addAnnouncement(payload);
            setAnnouncements(prev => [...prev, { id: data.id, ...payload }]);
            return true;
        } catch (e) {
            setError(e?.message || 'Failed to add announcement.');
            return false;
        }
    };

    return (
        <div className="app">
            {showParticles ? (
                <Particles
                    particleCount={140}
                    particleSpread={18}
                    speed={0.2}
                    particleColors={['#9aa7ff', '#7cf0ff', '#ffffff']}
                    moveParticlesOnHover={true}
                    particleHoverFactor={2}
                    alphaParticles={true}
                    particleBaseSize={28}
                    sizeRandomness={0.65}
                    cameraDistance={30}
                    disableRotation={true}
                    pixelRatio={window.devicePixelRatio}
                    className="fixed inset-0 z-0 pointer-events-none"
                />
            ) : null}

            <Header
                title={content?.title || 'UG Academic Council (UGAC) - IIT Mandi'}
                subtitle={content?.subtitle || 'Information, processes, and resources for undergraduates'}
                sections={content?.sections || []}
            />

            {error ? (
                <>
                    <div className="ui-page relative z-10">
                        <div className="rounded-2xl border border-red-400/40 bg-red-500/10 p-4 text-red-100">{error}</div>
                    </div>
                    <Footer />
                </>
            ) : (
                <>
                    <div className="relative z-10">
                        <Routes>
                        <Route path="/" element={<HomePage content={content} />} />
                        <Route path="/topics" element={<TopicsPage content={content} />} />
                        <Route path="/topic/:id" element={<TopicPage content={content} />} />
                        <Route
                            path="/announcements"
                            element={
                                <AnnouncementsPage announcements={announcements} onAdd={onAddAnnouncement} error={error} />
                            }
                        />
                        <Route path="/contacts" element={<ContactsPage content={content} />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </div>
                    <Footer />
                </>
            )}
        </div>
    );
};

export default App;
