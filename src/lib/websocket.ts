import { io, Socket } from 'socket.io-client';

export interface SocketEvents {
  // Connection events
  connected: (data: { userId: string; timestamp: string }) => void;
  error: (error: { message: string }) => void;
  disconnect: () => void;

  // Message events
  message_status_update: (data: any) => void;
  user_typing: (data: { userId: string; userName: string }) => void;
  user_stopped_typing: (data: { userId: string }) => void;

  // Analytics events
  analytics_update: (data: any) => void;

  // Campaign events
  campaign_update: (data: any) => void;

  // Notification events
  notification: (notification: any) => void;
  admin_notification: (data: any) => void;

  // System events
  usage_alert: (data: any) => void;
  system_maintenance: (data: any) => void;
  upload_progress: (data: any) => void;
  bulk_operation_progress: (data: any) => void;
  subscription_update: (data: any) => void;
}

class WebSocketService {
  private socket: Socket | null = null;
  private token: string | null = null;
  private isConnecting = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  constructor() {
    this.setupEventListeners();
  }

  // Initialize WebSocket connection
  connect(token: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.socket?.connected) {
        resolve();
        return;
      }

      if (this.isConnecting) {
        reject(new Error('Already connecting'));
        return;
      }

      this.isConnecting = true;
      this.token = token;

      const serverUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

      this.socket = io(serverUrl, {
        auth: {
          token: token
        },
        transports: ['websocket', 'polling'],
        timeout: 20000,
        forceNew: true
      });

      this.socket.on('connect', () => {
        console.log('✅ WebSocket connected');
        this.isConnecting = false;
        this.reconnectAttempts = 0;
        resolve();
      });

      this.socket.on('connected', (data) => {
        console.log('🔗 WebSocket authenticated:', data);
      });

      this.socket.on('connect_error', (error) => {
        console.error('❌ WebSocket connection error:', error);
        this.isConnecting = false;
        this.handleReconnect();
        reject(error);
      });

      this.socket.on('disconnect', (reason) => {
        console.log('🔌 WebSocket disconnected:', reason);
        this.isConnecting = false;
        
        if (reason !== 'io client disconnect') {
          this.handleReconnect();
        }
      });

      this.socket.on('error', (error) => {
        console.error('❌ WebSocket error:', error);
        this.isConnecting = false;
      });
    });
  }

  // Disconnect WebSocket
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    this.token = null;
    this.isConnecting = false;
    this.reconnectAttempts = 0;
  }

  // Handle reconnection logic
  private handleReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('❌ Max reconnect attempts reached');
      return;
    }

    if (!this.token) {
      console.log('ℹ️ No token available for reconnection');
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

    console.log(`🔄 Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);

    setTimeout(() => {
      if (!this.socket?.connected && this.token) {
        this.connect(this.token).catch(console.error);
      }
    }, delay);
  }

  // Set up global event listeners
  private setupEventListeners(): void {
    // Handle page visibility changes
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible' && this.token && !this.socket?.connected) {
          this.connect(this.token).catch(console.error);
        }
      });
    }

    // Handle online/offline events
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => {
        if (this.token && !this.socket?.connected) {
          this.connect(this.token).catch(console.error);
        }
      });

      window.addEventListener('offline', () => {
        console.log('📴 Browser went offline');
      });
    }
  }

  // Event subscription methods
  on<K extends keyof SocketEvents>(event: K, callback: SocketEvents[K]): void {
    if (this.socket) {
      this.socket.on(event as string, callback as (...args: any[]) => void);
    }
  }

  off<K extends keyof SocketEvents>(event: K, callback?: SocketEvents[K]): void {
    if (this.socket) {
      this.socket.off(event as string, callback as (...args: any[]) => void);
    }
  }

  // Event emission methods
  emit(event: string, data?: any): void {
    if (this.socket?.connected) {
      this.socket.emit(event, data);
    } else {
      console.warn('⚠️ Cannot emit event: WebSocket not connected');
    }
  }

  // Specific event methods
  subscribeToAnalytics(): void {
    this.emit('subscribe_analytics');
  }

  unsubscribeFromAnalytics(): void {
    this.emit('unsubscribe_analytics');
  }

  subscribeToCampaign(campaignId: string): void {
    this.emit('subscribe_campaign_updates', campaignId);
  }

  unsubscribeFromCampaign(campaignId: string): void {
    this.emit('unsubscribe_campaign_updates', campaignId);
  }

  startTyping(data?: any): void {
    this.emit('typing_start', data);
  }

  stopTyping(data?: any): void {
    this.emit('typing_stop', data);
  }

  updateMessageStatus(data: any): void {
    this.emit('message_status_update', data);
  }

  // Admin methods
  adminBroadcast(data: any): void {
    this.emit('admin_broadcast', data);
  }

  // Utility methods
  isConnected(): boolean {
    return this.socket?.connected || false;
  }

  getConnectionId(): string | undefined {
    return this.socket?.id;
  }

  // Real-time notification helpers
  showNotification(notification: any): void {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title || 'MsgBotPro', {
        body: notification.message,
        icon: '/favicon.ico',
        tag: notification.id || 'msgbotpro-notification'
      });
    }
  }

  // Request notification permission
  async requestNotificationPermission(): Promise<boolean> {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }
}

// Create singleton instance
const webSocketService = new WebSocketService();

export default webSocketService;
