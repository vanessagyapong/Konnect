import { StyleSheet, Dimensions } from 'react-native';
import { spacing, borderRadius, shadows } from './index';

const { width } = Dimensions.get('window');

export const sharedStyles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    padding: spacing.md,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  
  // Cards & Surfaces
  card: {
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  surfaceCard: {
    borderRadius: borderRadius.lg,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  
  // Headers
  header: {
    marginBottom: spacing.xl,
    alignItems: 'center',
  },
  headerTitle: {
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  headerSubtitle: {
    marginBottom: spacing.md,
    textAlign: 'center',
    opacity: 0.7,
  },
  
  // Forms
  inputContainer: {
    marginBottom: spacing.md,
  },
  buttonContainer: {
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  
  // Lists & Content
  contentContainer: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  listItem: {
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  
  // Flex Layouts
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  // User Elements
  avatar: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.full,
  },
  username: {
    fontWeight: '700',
  },
  handle: {
    opacity: 0.6,
  },
  
  // Post Elements
  post: {
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  postContent: {
    marginBottom: spacing.md,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.sm,
  },
  
  // Voting
  voteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  voteCount: {
    minWidth: 40,
    textAlign: 'center',
  },
  
  // Community Elements
  communityIcon: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.full,
  },
  communityHeader: {
    padding: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  communityStats: {
    flexDirection: 'row',
    gap: spacing.xl,
    paddingVertical: spacing.md,
  },
  
  // Utility
  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: spacing.md,
  },
  errorText: {
    marginBottom: spacing.sm,
    textAlign: 'center',
    color: 'error',
  },
  chip: {
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    marginRight: spacing.xs,
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Images
  image: {
    width: '100%',
    height: width * 0.6,
    borderRadius: borderRadius.md,
    marginVertical: spacing.sm,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.sm,
  },
}); 