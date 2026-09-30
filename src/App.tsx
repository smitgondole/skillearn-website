import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { CustomCursor } from './components/CustomCursor';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { NotificationDropdown } from './components/NotificationDropdown';
import { BookingModal } from './components/BookingModal';
import { ReviewModal } from './components/ReviewModal';
import { MobileBottomNav } from './components/MobileBottomNav';

import { HomeView } from './views/HomeView';
import { ExploreView } from './views/ExploreView';
import { SkillsCatalogView } from './views/SkillsCatalogView';
import { PlayersView } from './views/PlayersView';
import { CoachesView } from './views/CoachesView';
import { ProfileDetailView } from './views/ProfileDetailView';
import { VenuesView } from './views/VenuesView';
import { VenueDetailView } from './views/VenueDetailView';
import { DashboardView } from './views/DashboardView';
import { ProgressView } from './views/ProgressView';
import { JourneyView } from './views/JourneyView';
import { MessagesView } from './views/MessagesView';
import { TeachView } from './views/TeachView';

import {
  MOCK_USERS,
  MOCK_VENUES,
  MOCK_BOOKINGS,
  MOCK_REVIEWS,
  MOCK_NOTIFICATIONS,
  MOCK_CHAT_THREADS,
} from './data/mockData';
import { UserProfile, Venue, Booking, ReviewItem, AppNotification, ChatThread } from './types';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [selectedUserId, setSelectedUserId] = useState<string>('aditya-sharma');
  const [selectedVenueId, setSelectedVenueId] = useState<string>('smash-arena');

  // Application Data States
  const [users, setUsers] = useState<UserProfile[]>(MOCK_USERS);
  const [venues, setVenues] = useState<Venue[]>(MOCK_VENUES);
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [reviews, setReviews] = useState<ReviewItem[]>(MOCK_REVIEWS);
  const [notifications, setNotifications] = useState<AppNotification[]>(MOCK_NOTIFICATIONS);
  const [chatThreads, setChatThreads] = useState<ChatThread[]>(MOCK_CHAT_THREADS);

  // Modal States
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedCoachForBooking, setSelectedCoachForBooking] = useState<UserProfile | null>(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedCoachForReview, setSelectedCoachForReview] = useState<UserProfile | null>(null);

  // Navigation router
  const handleNavigate = (route: string, param?: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (route === 'profile' && param) {
      setSelectedUserId(param);
      setCurrentRoute('profile');
      return;
    }
    if (route === 'venues' && param) {
      setSelectedVenueId(param);
      setCurrentRoute('venue_detail');
      return;
    }
    setCurrentRoute(route);
  };

  // Booking action handlers
  const handleStartBooking = (coach: UserProfile) => {
    setSelectedCoachForBooking(coach);
    setBookingModalOpen(true);
  };

  const handleConfirmBooking = (newBooking: Booking) => {
    setBookings(prev => [newBooking, ...prev]);

    // Also push a live notification
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Booking Confirmed',
      description: `Your session for ${newBooking.skillName} with ${newBooking.coachName} has been booked!`,
      time: 'Just now',
      read: false,
      type: 'booking',
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Send a confirmation system message in the coach's chat thread
    setChatThreads(prev => {
      const threadIdx = prev.findIndex(t => t.userId === newBooking.coachId);
      if (threadIdx !== -1) {
        const updated = [...prev];
        updated[threadIdx] = {
          ...updated[threadIdx],
          lastMessage: `Session confirmed for ${newBooking.date} at ${newBooking.timeSlot}`,
          lastMessageTime: 'Just now',
          messages: [
            ...updated[threadIdx].messages,
            {
              id: `msg-${Date.now()}`,
              senderId: 'system',
              senderName: 'SKILLEARN Bot',
              text: `Session confirmed for ${newBooking.date} at ${newBooking.timeSlot}`,
              timestamp: 'Just now',
              isSelf: false,
              bookingCard: {
                skill: newBooking.skillName,
                date: newBooking.date,
                time: newBooking.timeSlot,
                venue: newBooking.venueName || 'Pune Arena',
              },
            },
          ],
        };
        return updated;
      }
      return prev;
    });
  };

  // Review submission handler
  const handleStartReview = (coach: UserProfile) => {
    setSelectedCoachForReview(coach);
    setReviewModalOpen(true);
  };

  const handleSubmitReview = (newReview: ReviewItem) => {
    setReviews(prev => [newReview, ...prev]);
    // update coach review count
    setUsers(prev =>
      prev.map(u => {
        if (u.id === newReview.coachId) {
          const newCount = u.reviewCount + 1;
          const newAvg = (u.rating * u.reviewCount + newReview.rating) / newCount;
          return { ...u, reviewCount: newCount, rating: Number(newAvg.toFixed(1)) };
        }
        return u;
      })
    );
  };

  // Chat message sending handler
  const handleSendMessage = (threadId: string, text: string) => {
    setChatThreads(prev =>
      prev.map(t => {
        if (t.id === threadId) {
          const newMsg = {
            id: `msg-${Date.now()}`,
            senderId: 'swetank',
            senderName: 'Swetank Kulkarni',
            text,
            timestamp: 'Just now',
            isSelf: true,
          };
          return {
            ...t,
            lastMessage: text,
            lastMessageTime: 'Just now',
            messages: [...t.messages, newMsg],
          };
        }
        return t;
      })
    );
  };

  // Mentor profile creation handler
  const handleCreateMentor = (newMentor: UserProfile) => {
    setUsers(prev => [newMentor, ...prev]);
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Mentor Profile Live',
      description: `Your profile for ${newMentor.primarySkill} is now searchable across Pune.`,
      time: 'Just now',
      read: false,
      type: 'skill',
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Notification handlers
  const handleMarkNotifAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const handleMarkAllNotifsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Active items lookup
  const activeUser = users.find(u => u.id === selectedUserId) || users[0];
  const activeVenue = venues.find(v => v.id === selectedVenueId) || venues[0];

  const unreadMessagesCount = chatThreads.reduce((acc, t) => acc + (t.unreadCount || 0), 0);

  return (
    <div className="min-h-screen bg-[#08090C] text-[#F3F4F6] relative font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Subtle Custom Cursor for Desktop */}
      <CustomCursor />

      {/* Top Bar Navigation (Strict Top Bar Contract: 3 Zones) */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        onOpenSearch={() => setSearchModalOpen(true)}
        notifications={notifications}
        onToggleNotificationDropdown={() =>
          setNotificationDropdownOpen(!notificationDropdownOpen)
        }
        isNotificationOpen={notificationDropdownOpen}
      />

      {/* Notification Dropdown */}
      <NotificationDropdown
        isOpen={notificationDropdownOpen}
        onClose={() => setNotificationDropdownOpen(false)}
        notifications={notifications}
        onMarkAsRead={handleMarkNotifAsRead}
        onMarkAllAsRead={handleMarkAllNotifsAsRead}
        onNavigate={handleNavigate}
      />

      {/* Global Command Search (Cmd+K) */}
      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Multi-Step Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        coach={selectedCoachForBooking}
        venues={venues}
        onConfirmBooking={handleConfirmBooking}
      />

      {/* Review Submission Modal */}
      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        coach={selectedCoachForReview}
        onSubmitReview={handleSubmitReview}
      />

      {/* Main Page Content Router */}
      <main className="min-h-[85vh]">
        {currentRoute === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onBookSession={handleStartBooking}
            onOpenSearch={() => setSearchModalOpen(true)}
            onSelectVenue={venueId => {
              setSelectedVenueId(venueId);
              setCurrentRoute('venue_detail');
            }}
            onSelectProfile={userId => {
              setSelectedUserId(userId);
              setCurrentRoute('profile');
            }}
          />
        )}

        {currentRoute === 'explore' && (
          <ExploreView
            onViewProfile={userId => {
              setSelectedUserId(userId);
              setCurrentRoute('profile');
            }}
            onBookSession={handleStartBooking}
          />
        )}

        {currentRoute === 'skills' && (
          <SkillsCatalogView
            onSelectSkill={_skillId => {}}
            onNavigate={handleNavigate}
          />
        )}

        {currentRoute === 'players' && (
          <PlayersView
            onViewProfile={userId => {
              setSelectedUserId(userId);
              setCurrentRoute('profile');
            }}
            onBookSession={handleStartBooking}
          />
        )}

        {currentRoute === 'coaches' && (
          <CoachesView
            onViewProfile={userId => {
              setSelectedUserId(userId);
              setCurrentRoute('profile');
            }}
            onBookSession={handleStartBooking}
          />
        )}

        {currentRoute === 'profile' && (
          <ProfileDetailView
            user={activeUser}
            reviews={reviews}
            onBack={() => setCurrentRoute('explore')}
            onBookSession={handleStartBooking}
            onOpenMessage={_userId => {
              setCurrentRoute('messages');
            }}
            onOpenReviewModal={handleStartReview}
          />
        )}

        {currentRoute === 'venues' && (
          <VenuesView
            onViewVenue={venueId => {
              setSelectedVenueId(venueId);
              setCurrentRoute('venue_detail');
            }}
            onBookCourt={venue => {
              setSelectedVenueId(venue.id);
              setCurrentRoute('venue_detail');
            }}
          />
        )}

        {currentRoute === 'venue_detail' && (
          <VenueDetailView
            venue={activeVenue}
            onBack={() => setCurrentRoute('venues')}
            onCourtBooked={details => {
              const newBooking: Booking = {
                id: `bk-court-${Date.now()}`,
                coachId: 'venue-booking',
                coachName: 'Court Reservation',
                skillName: `${activeVenue.sport} Court Hire`,
                date: details.time.split(' at ')[0],
                timeSlot: details.time.split(' at ')[1] || '6:00 PM',
                durationMinutes: 60,
                locationType: 'venue',
                venueName: `${details.venueName} (${details.courtName})`,
                status: 'confirmed',
                sessionPrice: 0,
                venuePrice: details.price,
                platformFee: 20,
                totalPrice: details.price + 20,
                createdAt: new Date().toISOString(),
              };
              handleConfirmBooking(newBooking);
            }}
          />
        )}

        {currentRoute === 'dashboard' && (
          <DashboardView
            bookings={bookings}
            onNavigate={handleNavigate}
            onOpenReviewModal={handleStartReview}
            onViewProfile={userId => {
              setSelectedUserId(userId);
              setCurrentRoute('profile');
            }}
            allCoaches={users}
          />
        )}

        {currentRoute === 'progress' && (
          <ProgressView onNavigate={handleNavigate} />
        )}

        {currentRoute === 'journey' && (
          <JourneyView
            onBack={() => setCurrentRoute('progress')}
            onNavigate={handleNavigate}
          />
        )}

        {currentRoute === 'messages' && (
          <MessagesView
            threads={chatThreads}
            onSendMessage={handleSendMessage}
            onBookSessionWithUser={userId => {
              const coach = users.find(u => u.id === userId);
              if (coach) handleStartBooking(coach);
            }}
          />
        )}

        {currentRoute === 'teach' && (
          <TeachView
            onMentorCreated={handleCreateMentor}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation Bar (App-like feel on mobile) */}
      <MobileBottomNav
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        unreadMessagesCount={unreadMessagesCount}
      />
    </div>
  );
}
