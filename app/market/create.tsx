import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Text, TextInput, Button, SegmentedButtons, Chip, IconButton, Surface, HelperText } from 'react-native-paper';
import { sharedStyles } from '@/theme/styles';
import { spacing } from '@/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

// Listing categories with subcategories
const categories = {
  textbooks: {
    name: 'Textbooks',
    subcategories: [
      'Computer Science',
      'Mathematics',
      'Engineering',
      'Biology',
      'Chemistry',
      'Physics',
      'Other'
    ]
  },
  electronics: {
    name: 'Electronics',
    subcategories: [
      'Laptops',
      'Tablets',
      'Calculators',
      'Lab Equipment',
      'Accessories',
      'Other'
    ]
  },
  furniture: {
    name: 'Furniture',
    subcategories: [
      'Desks',
      'Chairs',
      'Storage',
      'Lamps',
      'Dorm Essentials',
      'Other'
    ]
  },
  studyMaterials: {
    name: 'Study Materials',
    subcategories: [
      'Notes',
      'Practice Tests',
      'Study Guides',
      'Lab Materials',
      'Other'
    ]
  },
  courseSpecific: {
    name: 'Course Specific',
    subcategories: [
      'Lab Kits',
      'Project Materials',
      'Required Tools',
      'Software Licenses',
      'Other'
    ]
  }
};

type CategoryKey = keyof typeof categories;

export default function CreateListingScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState('new');
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [courseCode, setCourseCode] = useState('');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) newErrors.title = 'Title is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!price.trim()) newErrors.price = 'Price is required';
    if (!selectedCategory) newErrors.category = 'Category is required';
    if (!selectedSubcategory) newErrors.subcategory = 'Subcategory is required';
    if (!location.trim()) newErrors.location = 'Location is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    // TODO: Implement actual listing creation
    console.log({
      title,
      description,
      price,
      condition,
      category: selectedCategory,
      subcategory: selectedSubcategory,
      courseCode,
      location,
      images
    });

    router.back();
  };

  return (
    <SafeAreaView style={[sharedStyles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView>
          <View style={{ padding: spacing.md }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg }}>
              <IconButton
                icon="arrow-left"
                size={24}
                onPress={() => router.back()}
              />
              <Text variant="headlineMedium">Create Listing</Text>
            </View>

            <Surface style={{ padding: spacing.md, marginBottom: spacing.md, borderRadius: theme.roundness }}>
              <Text variant="titleMedium" style={{ marginBottom: spacing.md }}>Basic Information</Text>
              
              <TextInput
                label="Title"
                value={title}
                onChangeText={setTitle}
                mode="outlined"
                error={!!errors.title}
                style={{ marginBottom: spacing.xs }}
              />
              {errors.title && <HelperText type="error">{errors.title}</HelperText>}

              <TextInput
                label="Description"
                value={description}
                onChangeText={setDescription}
                mode="outlined"
                multiline
                numberOfLines={4}
                error={!!errors.description}
                style={{ marginBottom: spacing.xs }}
              />
              {errors.description && <HelperText type="error">{errors.description}</HelperText>}

              <TextInput
                label="Price"
                value={price}
                onChangeText={setPrice}
                mode="outlined"
                keyboardType="numeric"
                error={!!errors.price}
                style={{ marginBottom: spacing.xs }}
                left={<TextInput.Affix text="$" />}
              />
              {errors.price && <HelperText type="error">{errors.price}</HelperText>}

              <Text variant="bodyMedium" style={{ marginBottom: spacing.xs }}>Condition</Text>
              <SegmentedButtons
                value={condition}
                onValueChange={setCondition}
                buttons={[
                  { value: 'new', label: 'New' },
                  { value: 'like_new', label: 'Like New' },
                  { value: 'good', label: 'Good' },
                  { value: 'fair', label: 'Fair' },
                ]}
                style={{ marginBottom: spacing.md }}
              />
            </Surface>

            <Surface style={{ padding: spacing.md, marginBottom: spacing.md, borderRadius: theme.roundness }}>
              <Text variant="titleMedium" style={{ marginBottom: spacing.md }}>Category</Text>
              
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, marginBottom: spacing.md }}>
                {Object.entries(categories).map(([key, category]) => (
                  <Chip
                    key={key}
                    selected={selectedCategory === key}
                    onPress={() => {
                      setSelectedCategory(key as CategoryKey);
                      setSelectedSubcategory(null);
                    }}
                    style={{ marginBottom: spacing.xs }}
                  >
                    {category.name}
                  </Chip>
                ))}
              </View>
              {errors.category && <HelperText type="error">{errors.category}</HelperText>}

              {selectedCategory && (
                <>
                  <Text variant="bodyMedium" style={{ marginBottom: spacing.xs }}>Subcategory</Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs }}>
                    {categories[selectedCategory].subcategories.map(subcategory => (
                      <Chip
                        key={subcategory}
                        selected={selectedSubcategory === subcategory}
                        onPress={() => setSelectedSubcategory(subcategory)}
                        style={{ marginBottom: spacing.xs }}
                      >
                        {subcategory}
                      </Chip>
                    ))}
                  </View>
                  {errors.subcategory && <HelperText type="error">{errors.subcategory}</HelperText>}
                </>
              )}

              {(selectedCategory === 'textbooks' || selectedCategory === 'courseSpecific') && (
                <TextInput
                  label="Course Code (Optional)"
                  value={courseCode}
                  onChangeText={setCourseCode}
                  mode="outlined"
                  placeholder="e.g., CS101"
                  style={{ marginTop: spacing.md }}
                />
              )}
            </Surface>

            <Surface style={{ padding: spacing.md, marginBottom: spacing.md, borderRadius: theme.roundness }}>
              <Text variant="titleMedium" style={{ marginBottom: spacing.md }}>Location & Images</Text>
              
              <TextInput
                label="Location"
                value={location}
                onChangeText={setLocation}
                mode="outlined"
                placeholder="e.g., Library, Science Building"
                error={!!errors.location}
                style={{ marginBottom: spacing.xs }}
              />
              {errors.location && <HelperText type="error">{errors.location}</HelperText>}

              <Text variant="bodyMedium" style={{ marginVertical: spacing.sm }}>Images (Optional)</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
                {images.map((uri, index) => (
                  <Surface key={index} style={{ borderRadius: theme.roundness, overflow: 'hidden' }}>
                    <View style={{ width: 100, height: 100 }}>
                      <IconButton
                        icon="close"
                        size={20}
                        onPress={() => removeImage(index)}
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          zIndex: 1,
                          backgroundColor: theme.colors.surfaceVariant,
                        }}
                      />
                    </View>
                  </Surface>
                ))}
                {images.length < 5 && (
                  <Button
                    mode="outlined"
                    onPress={handleImagePick}
                    icon="camera"
                    style={{ height: 100, width: 100, justifyContent: 'center' }}
                  >
                    Add
                  </Button>
                )}
              </View>
            </Surface>

            <Button
              mode="contained"
              onPress={handleSubmit}
              style={{ marginVertical: spacing.lg }}
            >
              Create Listing
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
} 